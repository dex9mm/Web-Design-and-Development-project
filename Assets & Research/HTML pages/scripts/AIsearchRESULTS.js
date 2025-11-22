        // --- Configuration and API Setup ---
        const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;
        const API_KEY = ""; // Canvas will provide this if empty

        // --- DOM Elements ---
        const loadingOverlay = document.getElementById('loadingOverlay');
        const resultsModal = document.getElementById('resultsModal');
        const resultsList = document.getElementById('resultsList');
        const aiSummary = document.getElementById('aiSummary');
        const errorBox = document.getElementById('errorBox');
        const amenityButton = document.getElementById('amenityButton');

        // --- Modal Control Functions ---

        function showModal() {
            resultsModal.classList.remove('hidden');
        }

        function hideModal() {
            resultsModal.classList.add('hidden');
            // Clear content when closing
            resultsList.innerHTML = '';
            aiSummary.textContent = '';
            errorBox.classList.add('hidden');
            errorBox.textContent = '';
        }

        function setLoading(isLoading) {
            if (isLoading) {
                loadingOverlay.classList.remove('hidden');
                amenityButton.disabled = true;
            } else {
                loadingOverlay.classList.add('hidden');
                amenityButton.disabled = false;
            }
        }
        
        /**
         * Generic function for fetching data with exponential backoff.
         */
        async function fetchWithBackoff(url, options, maxRetries = 5) {
            for (let attempt = 0; attempt < maxRetries; attempt++) {
                try {
                    const response = await fetch(url, options);
                    if (response.ok) {
                        return response;
                    } else if (response.status === 429 && attempt < maxRetries - 1) {
                        // Rate limit error, retry
                        const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000;
                        await new Promise(resolve => setTimeout(resolve, delay));
                        continue;
                    } else {
                        throw new Error(`API request failed with status: ${response.status}`);
                    }
                } catch (error) {
                    if (attempt === maxRetries - 1) {
                        throw error;
                    }
                    // Handle network or other errors with backoff
                    const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000;
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
            throw new Error("Maximum retries reached for API call.");
        }

        /**
         * Displays the search results (citations) in the modal.
         * @param {string} text - The AI-generated summary text.
         * @param {Array<Object>} sources - Array of source objects (uri, title).
         */
        function showResults(text, sources) {
            aiSummary.textContent = text;
            resultsList.innerHTML = ''; // Clear previous results
            errorBox.classList.add('hidden');

            const topSources = sources.slice(0, 5); // Take only the top 5
            
            if (topSources.length === 0) {
                // Handle case where search grounding provides no sources
                resultsList.innerHTML = `<li class="text-gray-500 italic">No specific external search sources were found, but a general summary is provided above.</li>`;
            } else {
                topSources.forEach((source, index) => {
                    const listItem = document.createElement('li');
                    listItem.className = 'bg-blue-50 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow';
                    
                    const link = document.createElement('a');
                    link.href = source.uri;
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                    link.className = 'text-blue-600 hover:text-blue-800 font-medium break-words block';
                    link.innerHTML = `<strong>${index + 1}. ${source.title || 'Untitled Source'}</strong>`;
                    
                    const uriText = document.createElement('span');
                    uriText.className = 'text-sm text-gray-500 block truncate';
                    uriText.textContent = source.uri;

                    listItem.appendChild(link);
                    listItem.appendChild(uriText);
                    resultsList.appendChild(listItem);
                });
            }

            showModal();
        }

        /**
         * Main function to perform the grounded search and display results.
         */
        async function findNearestAmenity() {
            setLoading(true);

            const userQuery = "Find the nearest water amenity near the user's current location and provide a very brief, single-paragraph summary of the findings.";
            const systemPrompt = "You are a helpful, web-grounded assistant. Answer the user query based solely on the search results provided by the Google Search tool. Your response must be concise and informative.";

            const payload = {
                contents: [{ parts: [{ text: userQuery }] }],
                tools: [{ "google_search": {} }],
                systemInstruction: { parts: [{ text: systemPrompt }] },
            };

            try {
                const response = await fetchWithBackoff(`${API_URL}?key=${API_KEY}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();
                const candidate = result.candidates?.[0];
                
                if (!candidate || !candidate.content?.parts?.[0]?.text) {
                    throw new Error("Invalid API response format or missing content.");
                }

                // 1. Extract the generated text (summary)
                const text = candidate.content.parts[0].text;

                // 2. Extract grounding sources (citations)
                let sources = [];
                const groundingMetadata = candidate.groundingMetadata;
                if (groundingMetadata && groundingMetadata.groundingAttributions) {
                    sources = groundingMetadata.groundingAttributions
                        .map(attribution => ({
                            uri: attribution.web?.uri,
                            title: attribution.web?.title,
                        }))
                        .filter(source => source.uri); // Ensure sources are valid
                }

                showResults(text, sources);

            } catch (error) {
                console.error("Gemini API Error:", error);
                errorBox.classList.remove('hidden');
                errorBox.textContent = `Search failed: ${error.message}. Please try again.`;
                showModal(); // Show the modal with the error message
            } finally {
                setLoading(false);
            }
        }
