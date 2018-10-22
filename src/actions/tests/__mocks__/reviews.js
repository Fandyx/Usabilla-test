// __mocks__/request.js
const reviews = [{ reviewID: 1 }, { reviewId: 2 }];

export default function request(url) {
  return new Promise((resolve, reject) => {
    console.log("mockeo");
    process.nextTick(() => resolve(reviews));
  });
}
