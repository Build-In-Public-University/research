document.addEventListener('DOMContentLoaded', function() {
    const content = document.getElementById('content');
    const sections = [
        { id: 'introduction', title: '1. Introduction', file: 'content/1. Introduction.md' },
        { id: 'perfect-understanding', title: '2. The Economics of Perfect Understanding', file: 'content/2. The Economics of Perfect Understanding.md' },
        { id: 'network-complexity', title: '3. How Complexity Scales in Networks', file: 'content/3. How Complexity Scales in Networks.md' },
        { id: 'distance-problem', title: '4. The Distance Problem: Proximity to Value Understanding', file: 'content/4. The Distance Problem: Proximity to Value Understanding.md' },
        { id: 'startup-lifecycle', title: '5. The Startup Lifecycle Through the Complexity Lens', file: 'content/5. The Startup Lifecycle Through the Complexity Lens.md' },
        { id: 'human-insurance', title: '6. The Human Insurance Model', file: 'content/6. The Human Insurance Model.md' },
        { id: 'ai-era', title: '7. Implications for the AI Era', file: 'content/7. Implications for the AI Era.md' },
        { id: 'practical-applications', title: '8. Practical Applications', file: 'content/8. Practical Applications.md' },
        { id: 'conclusion', title: '9. Conclusion', file: 'content/9. Conclusion.md' },
        { id: 'bibliography', title: '10. Bibliography', file: 'content/10. Bibliography.md' }
    ];

    // Clear loading message and prepare content div
    content.innerHTML = '';

    // Load all sections
    loadSections();

    async function loadSections() {
        try {
            for (const section of sections) {
                const sectionDiv = document.createElement('div');
                sectionDiv.id = section.id;
                sectionDiv.className = 'section';
                
                // Create section header
                const sectionHeader = document.createElement('h2');
                sectionHeader.textContent = section.title;
                sectionDiv.appendChild(sectionHeader);

                try {
                    // Try to fetch the content
                    const response = await fetch(section.file);
                    if (response.ok) {
                        const markdown = await response.text();
                        const htmlContent = marked.parse(markdown);
                        const contentDiv = document.createElement('div');
                        contentDiv.innerHTML = htmlContent;
                        sectionDiv.appendChild(contentDiv);
                    } else {
                        // If file not found, add a placeholder
                        const placeholder = document.createElement('p');
                        placeholder.textContent = 'Content for this section is being updated.';
                        sectionDiv.appendChild(placeholder);
                    }
                } catch (error) {
                    console.error(`Error loading section ${section.title}:`, error);
                    const errorMsg = document.createElement('p');
                    errorMsg.textContent = 'Content for this section is being updated.';
                    sectionDiv.appendChild(errorMsg);
                }

                content.appendChild(sectionDiv);
            }

            // Add scroll behavior for table of contents
            setupScrollBehavior();
        } catch (error) {
            console.error('Error loading sections:', error);
            content.innerHTML = '<p>There was an error loading the content. Please try again later.</p>';
        }
    }

    function setupScrollBehavior() {
        const tocLinks = document.querySelectorAll('.toc a');
        
        tocLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 20,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}); 