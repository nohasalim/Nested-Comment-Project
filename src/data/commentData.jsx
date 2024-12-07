export const commentData = [
  {
    id: "1",
    image: "Images/image-amyrobson.png",
    username: "amyrobson",
    text: "Hello world! How are you?",
    timestamp: new Date().toISOString() ,// Store the current timestamp
    replies: [
      {
        id: "2",
        image: "Images/image-juliusomo.png",
        username: "juliusomo",
        text: "Hey, I am fine, wau?",
        timestamp: new Date().toISOString() ,// Store the current timestamp

        replies: [],
      }
    ],
  },

  {
    id: "3",
    image: "Images/image-maxblagun.png",
    username: "maxblagun",
    text: "Hello, I am good, How are you?",
    timestamp: new Date().toISOString() ,// Store the current timestamp

    replies: [
      {
        id: "4",
        image: "Images/image-ramsesmiron.png",
        username: "ramsesmiron",
        text: "Life sucks man!",
        timestamp: new Date().toISOString() ,// Store the current timestamp

        replies: [],
      }
    ],
  },
];
