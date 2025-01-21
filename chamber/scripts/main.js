document.addEventListener('DOMContentLoaded', () => {
    const membersContainer = document.getElementById('members');
    const gridViewButton = document.getElementById('grid-view');
    const listViewButton = document.getElementById('list-view');
    const yearSpan = document.getElementById('year');
    const lastModifiedSpan = document.getElementById('last-modified');

    // Display current year and last modified date
    yearSpan.textContent = new Date().getFullYear();
    lastModifiedSpan.textContent = new Date(document.lastModified).toLocaleString();

    // Variable to store member data
    let members = [];

    // Fetch and display members
    const fetchMembers = async () => {
        try {
            const response = await fetch('data/members.json');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            members = await response.json();
            displayMembers(members, 'grid'); // Display in grid view by default
        } catch (error) {
            console.error("Error fetching members:", error);
            membersContainer.innerHTML = `<p class="error-message">Unable to load member data. Please try again later.</p>`;
        }
    };

    // Function to display members in the specified view
    const displayMembers = (members, view) => {
        membersContainer.className = view; // Apply view class
        membersContainer.innerHTML = ''; // Clear existing content

        if (!members.length) {
            membersContainer.innerHTML = `<p class="error-message">No members to display.</p>`;
            return;
        }

        members.forEach(member => {
            const card = document.createElement('div');
            card.className = 'member-card';
            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}" loading="lazy">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
            `;
            membersContainer.appendChild(card);
        });
    };

    // Add event listeners to toggle views
    gridViewButton.addEventListener('click', () => {
        gridViewButton.classList.add('active');
        listViewButton.classList.remove('active');
        displayMembers(members, 'grid');
    });

    listViewButton.addEventListener('click', () => {
        listViewButton.classList.add('active');
        gridViewButton.classList.remove('active');
        displayMembers(members, 'list');
    });

    // Initial fetch
    fetchMembers();
});
