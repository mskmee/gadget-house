export const saveReviews = async (
  userId: number,
  productId: number,
  reviewBody: string,
) => {
  const url = 'https://store-gadget-home.koyeb.app/api/v1/reviews/1';

  const data = {
    userId: userId, // Replace with actual userId
    productId: productId, // Replace with actual productId
    body: reviewBody, // Replace with the review body content
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log('Review submitted successfully:', responseData);
    } else {
      console.error('Failed to submit review:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Example usage:
