/*** 
 * @type number - number of students to display per page
*/
const itemsPerPage = 9

/*** 
 * @type {Object}: students - collection of all students
*/
const students = data

/*** 
 * @function showPage
 * create and insert/append the elements needed to display a page
 * @param {Object[]} list - students array
   @param {number} page - the 'active' page a user is viewing 
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

/*** 
 * @function addPagination
 * create and insert/append the elements needed for the pagination buttons
 * @param {@bject[]} list - students array
*/

function addPagination(list) {
   const totalPages = Math.ceil(list.length / itemsPerPage)
   const linkList = document.querySelector('.link-list')
   linkList.innerHTML = ''
   for (let i = 1; i <= totalPages; i++) {
      const button = `<li>
      <button type='button'>${i}</button>
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

/*** 
 * create and insert/append the elements needed for a search bar
*/
const header = document.querySelector('header')
const label = document.createElement('label')
label.for = 'search'
label.className = 'student-search'
const span = document.createElement('span')
const input = document.createElement('input')
input.value = ''
input.id = 'search'
input.placeholder = 'Search by name...'
const button = document.createElement('button')
button.type = 'button'
const img = document.createElement('img')
img.alt = 'Search icon'
img.src = './img/icn-search.svg'
button.append(img)
label.append(span)
label.append(input)
label.append(button)
header.append(label)

/*** 
 * create and insert/append the h2 needed for 'no results' 
*/
const h2 = document.createElement('h2')
h2.id = 'no-results'
header.insertAdjacentElement('afterEnd',h2)

/*** 
 * @function search
 * filter the paginated data based on user input
*/
function search() {
   h2.innerHTML = ''
   const filteredStudentArr = []
   const search = input.value.toUpperCase()
   for (let i = 0; i < students.length; i++) {
      const studentName = `${students[i].name.first.toUpperCase()} ${students[i].name.last.toUpperCase()}`
      if (studentName.includes(search)) {
         filteredStudentArr.push(students[i])
      }
   }
   if (filteredStudentArr.length === 0) {
      h2.innerText= 'No results found.'
      if(document.querySelector('.link-list')) {
         document.querySelector('.link-list').innerHTML = ''
      }
   } else {
      addPagination(filteredStudentArr)
   }
   showPage(filteredStudentArr, 1)
}

/*** 
 * @event
 * filters paginated data when the value of <input> changes
*/
input.addEventListener('input', () => {
   search()
})

/*** 
 * @event
 * filters paginated data when the search button is clicked
*/
button.addEventListener('click', () => {
   search()
})

/*** 
 * initialize the page with paginated student data
*/ 
showPage(students, 1)
addPagination(students)