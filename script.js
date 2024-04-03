

document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
  
    searchBtn.addEventListener('click', async () => {
      const townName = document.getElementById('townName').value;
      const radius = document.getElementById('radius').value;
  
    if (!townName || !radius) {
      errorMessage.textContent = 'Please enter both town name and radius.'; // Display error message
      return;
    }

    // Clear error message if inputs are valid
    errorMessage.textContent = '';

      try {
        // Make request to backend
        const response = await fetch(`/search?town=${townName}&radius=${radius}`);
        const data = await response.json();
  
        // Filter groups based on additional criteria
        const filteredGroups = data.filter(group => {
          return group.members > 1000 && group.privacy === 'private' && (group.type === 'community' || 
          group.type === 'town') && !group.name.toLowerCase().includes('business') && !group.name.toLowerCase().includes('buy/sell');
        });
  
        // Display search results
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = '';
  
        if (filteredGroups.length === 0) {
          resultsContainer.innerHTML = 'No matching groups found.';
        } else {
          const table = document.createElement('table');
          const tableHeader = document.createElement('tr');
          tableHeader.innerHTML = '<th>Group Name</th><th>Members</th><th>Type</th><th>Radius (miles)</th>';
          table.appendChild(tableHeader);
  
          filteredGroups.forEach(group => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${group.name}</td><td>${group.members}</td><td>${group.type}</td><td>${group.radius}</td>`;
            table.appendChild(row);
          });
  
          resultsContainer.appendChild(table);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        errorMessage.textContent = 'An error occured while fetching data'; // Display error message
        return;
      }
    });
  });
  