import axios from "axios";

// const imgurClientId = '72a7bd26c2e9f2b';

// curl --location 'https://api.imgur.com/3/image' \
// --header 'Authorization: Client-ID {{clientId}}' \
// --form 'image="R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"'

// const dummyFile = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJMYXllcl80IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNS4yNSAyMCI+PGRlZnM+PHN0eWxlPi5jbHMtMXtzdHJva2Utd2lkdGg6MHB4O308L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Im0xMy4zNCwxOC4xdi05LjUySDEuOTF2OS41MmgxMS40M20wLTExLjQzYzEuMDUsMCwxLjkxLjg1LDEuOTEsMS45djkuNTJjMCwxLjA1LS44NSwxLjktMS45MSwxLjlIMS45MWMtMS4wNSwwLTEuOTEtLjg1LTEuOTEtMS45di05LjUyYzAtMS4wNS44NS0xLjksMS45MS0xLjloOC41N3YtMS45YzAtMS41OC0xLjI4LTIuODYtMi44Ni0yLjg2cy0yLjg2LDEuMjgtMi44NiwyLjg2aC0xLjkxQzIuODYsMi4xMyw0Ljk5LDAsNy42MiwwczQuNzYsMi4xMyw0Ljc2LDQuNzZ2MS45aC45NW0tNS43Miw4LjU3Yy0xLjA1LDAtMS45MS0uODUtMS45MS0xLjlzLjg1LTEuOSwxLjkxLTEuOSwxLjkxLjg1LDEuOTEsMS45LS44NSwxLjktMS45MSwxLjlaIi8+PC9zdmc+';
// const simpleDummyFile = 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

// async function uploadDummyImage() {
//   const body = new FormData();
//   body.append('image', simpleDummyFile);
//   const res = await axios.post('https://api.imgur.com/3/image', body, {
//     headers: {
//       Authorization: `Client-ID ${imgurClientId}`,
//     },
//   });

//   // const res = await fetch(
//   //   'https://api.imgur.com/3/image',
//   //   {
//   //     method: 'POST',
//   //     headers: {
//   //       Authorization: `Client-ID ${imgurClientId}`,
//   //     },
//   //     body,
//   //   }
//   // );
//   console.log(res);
// }
