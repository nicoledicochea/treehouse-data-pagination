const itemsPerPage = 9
const students = data
/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page) {
   const start = (page * itemsPerPage) - itemsPerPage
   const end = (page * itemsPerPage) - 1
   const studentList = document.querySelector('.student-list')
   studentList.innerHTML = ''
   for (let i = 0; i < list.length; i++) {
      if (i >= start && i <= end) {
         const name = list[i].name
         const email = list[i].email
         const registered = list[i].registered
         const picture = list[i].picture
         const card = `<li class="student-item cf">
         <div class="student-details">
           <img class="avatar" src="${picture.large}" alt="Profile Picture">
           <h3>${name.first} ${name.last}</h3>
           <span class="email">${email}</span>
         </div>
         <div class="joined-details">
           <span class="date">Joined ${registered.date}</span>
         </div>
       </li>`
       studentList.insertAdjacentHTML('beforeend', card)
      }
   }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
   const totalPages = Math.ceil(list.length / itemsPerPage)
   const linkList = document.querySelector('.link-list')
   linkList.innerHTML = ''
   for (let i = 1; i <= totalPages; i++) {
      const button = `<li>
      <button type="button">${i}</button>
      </li>`
    linkList.insertAdjacentHTML('beforeend', button)
   }
   
   linkList.querySelector('button').className = 'active'

   linkList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         linkList.querySelector('.active').className = ''
         e.target.className = 'active'
         showPage(students, e.target.innerText)
      }
   })
}

// Call functions
showPage(students, 1)
addPagination(students)