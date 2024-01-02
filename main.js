const userList = document.querySelector('.user-list')
const postList = document.querySelector('.post-info')

function makeElement(tag, attr_n, attr_v, content) {
  let output = document.createElement(tag);
  (!!attr_n) && output.setAttribute(attr_n, attr_v);
  output.textContent = content;
  return output;
}

function userPost(userid){
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then( resp =>  resp.json())
  .then( data => {
    const lis = postList.querySelectorAll('li');
    for (let li of lis) {
      li.remove();
    }
    for (let el of data) {
      if (userid === el.userId) {
        const li = makeElement('li', 'class', `li-${el.userId}`, `${el.title} \n  ${el.body}`);
        postList.append(li);
      }
    }
  })
}

fetch('https://jsonplaceholder.typicode.com/users')
.then( resp =>  resp.json())
.then( data => {
  for (let el of data) {
    const li = makeElement('li', '', '', `${el.name} / ${el.email}`)
    li.addEventListener('click', () => {
      userPost(el.id)
    });
    userList.append(li)
  }
})