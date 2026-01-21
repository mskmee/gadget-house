export const saveReviews = async (
  userId: number,
  productId: number,
  reviewBody: string,
) => {
  const url = 'https://store-gadget-home.koyeb.app/api/v1/reviews/1';

  const data = {
    userId: userId,
    productId: productId,
    body: reviewBody,
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
