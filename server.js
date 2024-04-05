


const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for JSON parsing
app.use(express.json());

// App Access Token
const accessToken = '1356024228296106|0f5c7de4a5cd96ace4a99bfb2d7a7d05';

// Search route
app.get('/search', async (req, res) => {
  const { town, radius } = req.query;

  try {
    if (!town || !radius) {
      return res.status(400).json({ error: 'Please provide both town name and radius.' });
    }

    // Fetch group data from Facebook Graph API
    const groupData = await fetchGroupData(town);

    // Filter groups based on criteria
    const filteredGroups = filterGroups(groupData, radius);

    res.json(filteredGroups);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

// Function to fetch group data from Facebook Graph API
async function fetchGroupData(town) {
  try {
    const url = `https://graph.facebook.com/v12.0/search?type=group&q=${town}&access_token=${accessToken}`;
    const response = await axios.get(url);
    return response.data.data; // Return group data
  } catch (error) {
    throw new Error('Error fetching group data from Facebook Graph API');
  }
}

// Function to filter groups based on criteria
function filterGroups(groupData, radius) {
  // Implement logic to filter groups based on specified criteria
    return groupData;
}

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
