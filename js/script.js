/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/


const studentListItems = document.querySelector('.student-list').querySelectorAll('li');   // holds the li's inside the student list

const pageSize = 10; //  the max number of students per page 

console.log(studentListItems);





/***
 * loops through the list of students hides them unless they are on the currently 'Active' page in the list
***/
 const showPage = (list, page) => {

   const numberOfStudents = list.length;

   if( numberOfStudents == 0) {
      showMsg(true);
      return;
   }
   else {
      showMsg(false);
   }

   // index of first student to show on page
   const firstIndex = Math.max(0, (page * pageSize) - pageSize);           

   // index of last student to show on page
   const lastIndex = Math.min(numberOfStudents, (page * pageSize)) - 1;    

   for(let i = 0 ; i < numberOfStudents ; i++) {
      if(i >= firstIndex && i <= lastIndex) {
         list[i].style.display = 'block';
      }
      else {
         list[i].style.display = 'none';            
      }
   }
}



/***
 * Displays a message when no students are found
*/
const showMsg = (show) => {

   const pageDiv = document.querySelector('.page');

   let msgDiv = pageDiv.querySelector('#msg');
   
   if(msgDiv) {
      pageDiv.removeChild(msgDiv);
   }

   if(show) {
      const msgDiv = document.createElement('div');
      msgDiv.id = 'msg';

      const span = document.createElement('span');      
      span.textContent = 'no results found...';

      msgDiv.appendChild(span);

      const ul = pageDiv.querySelector('ul');
      pageDiv.insertBefore(msgDiv, ul);
   }
}






/***
 * Create a pagination button for each page of students
 * each button consists of a link within an li
 * each link handles its 'click' to select itself as the 'Active' page
***/
const appendPageLinks = (list) => {

   const pageDiv = document.querySelector('.page');

   const numberOfStudents = list.length;

   const numberOfPages = Math.ceil(numberOfStudents / pageSize);   
   
   console.log(numberOfPages);

   // remove pagination div if exists
   var div = pageDiv.querySelector('.pagination');

   if(div) {
      pageDiv.removeChild(div);
   }
   
   div = document.createElement('div');

   div.classList.add('pagination');

   const ul = document.createElement('ul');
   div.appendChild(ul);

   // Create pagination if more than one page of students exists
   if(numberOfPages > 1) {
      for(let p = 1 ; p <= numberOfPages ; p++) {
         
         const li = document.createElement('li');      
         const a = document.createElement('a');
         if(p == 1) {
            a.classList.add('active');
         }
         
         a.textContent = p;
   
         a.addEventListener('click', (e) => {
         
            const thisLink = e.target;
            const ul = thisLink.parentNode.parentNode;
            const lis  = ul.children;
   
            for(let i = 0 ; i < lis.length ; i++){
               const link = lis[i].querySelector('a');
               
               if(link) {
                  link.classList.remove('active');
               }
            }
   
            thisLink.classList.add('active');
   
            showPage(list, thisLink.textContent)
         })
   
         li.appendChild(a); 
         ul.appendChild(li);
      }
   }

   pageDiv.appendChild(div);
}


/**
 * Creates a div with an input and button 
 * includes handlers to allow a search of the term in the input
 * to happen when the button is clicked or when text is typed inside the input 
 */
const createSearch = () => {
   const headerDiv = document.querySelector('.page-header');

   searchDiv = document.createElement('div');

   searchDiv.classList.add('student-search');

   input = document.createElement('input');
   input.placeholder = 'Search for students...';
   input.addEventListener('keyup', searchStudents);

   button = document.createElement('button');
   button.textContent = 'search'
   button.addEventListener('click', searchStudents);

   searchDiv.appendChild(input);
   searchDiv.appendChild(button);
   
   headerDiv.appendChild(searchDiv);
}



/**
 * collates a list of students matching the search term
 * displays the first page of the students matching the search term
 * regenerates the pagination 
 */
const searchStudents = (e) => {
   
   let input = undefined;

   console.log(e.target.type);

   if(e.target.type === 'text')
      input = e.target;
   else if(e.target.type === 'submit')
      input = e.target.previousElementSibling;
   else
      return false;

   const searchTerm = input.value;
   
   const numberOfStudents = studentListItems.length;

   if( numberOfStudents == 0)
      return; 

   let found = [];   

   for(i = 0 ; i < numberOfStudents ; i++) {

      const studentName = studentListItems[i].textContent;
      
      if(studentName.search(searchTerm) != -1) {
         found.push(studentListItems[i]);
      }
   }

   // hide all students
   for(let i = 0 ; i < numberOfStudents ; i++) {
      studentListItems[i].style.display = 'none';            
   }

   showPage(found, 1)

   appendPageLinks(found);

   console.log(found);
}



showPage(studentListItems, 1)

// Creates div with the pagination links 
appendPageLinks(studentListItems);

// Creates the search bar
createSearch();















