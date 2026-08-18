const post = async () => {
  try {
    const token = localStorage.getItem('token');

    const res = fetch('http://localhost:3001/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'applications/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: 'Event Title',
        description: 'Some Description for the Event',
        date: '2026-08-18T11:52:16.161Z',
        location: 'Schloßbezirk 10, 76131 Karlsruhe',
        latitude: 8.404746955649602,
        longitude: 49.01438194665317,
      }),
    });
  } catch (error) {}
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsImlhdCI6MTc4NzA1MzgyMywiZXhwIjoxNzkwNjUzODIzfQ.-vc7ORoKDoS3BzStMCT5uMGPlzrLgM6sSYiYtAE-vdQ
