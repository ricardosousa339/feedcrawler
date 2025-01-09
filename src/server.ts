import axios from 'axios';

const url = 'https://public.api.bsky.app/xrpc/app.bsky.feed.getFeed';
const params = {
  feed: 'at://did:plc:gpunjjgvlyb4racypz3yfiq4/app.bsky.feed.generator/aaaooavxeutum'
};

axios.get(url, { params })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error making GET request:', error);
  });