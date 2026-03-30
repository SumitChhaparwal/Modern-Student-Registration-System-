//creating array of objects
let studentR = [];
// {
//     id: 1,
//     studentId: 22191,
//     name: "Surabh Sharma",
//     emailId: "surabh34@gmail.com",
//     contactNo: 9023234453,
//   },
//   {
//     id: 2,
//     studentId: 22192,
//     name: "Pritika Khana",
//     emailId: "pritika@gmail.com",
//     contactNo: 9023232343,
//   },
//   {
//     id: 3,
//     studentId: 22193,
//     name: "Ronak Jaiswal",
//     emailId: "ronak@gmail.com",
//     contactNo: 9023233432,
//   },

//Fun() to display all arrayofObjs data in form of table
function displayTable() {
  const tbody = document.querySelector("#tableBody");
  if (typeof Storage !== "undefined" && studentR) {
    //get data and parse array data...
    const saved = localStorage.getItem("studentsRecord");
    studentR = saved ? JSON.parse(saved) : [];
    tbody.innerHTML = studentR
      .map((student) => {
        return `<tr data-id=${student.id}>
      <td contenteditable="true" data-field="studentId">${student.studentId}</td>
      <td contenteditable="true" data-field="name">${student.name}</td>
      <td contenteditable="true" data-field="emailId">${student.emailId}</td>
      <td contenteditable="true" data-field="contactNo">${student.contactNo}</td>
      <td id="trashBtn" class="tBtn">
        <button>
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    </tr>`;
      })
      .join("");
  } else {
    console.log("browser doesn't support local storage...");
  }
}
displayTable();

//adding vertical scrollbar dynamically
function verticalScroll() {
  const recordContainer = document.querySelector(".record-container");
  const currentHeight = parseInt(
    window.getComputedStyle(recordContainer).height,
  );
  
  if (parseInt(currentHeight) > 300) {
    recordContainer.style.width = "auto";
    recordContainer.style.overflowY = "scroll";
  } else {
    recordContainer.style.height = "auto";
    recordContainer.style.overflowY = "hidden";
  }
}
verticalScroll();

//fun() for Adding record to the table through arrayOfObjs...
function addRecord() {
  let sIdValue = document.querySelector("#studentId").value;
  let sNameValue = document.querySelector("#studentName").value;
  let sEmailValue = document.querySelector("#emailId").value;
  let sContactValue = document.querySelector("#contactNum").value;
  let idValue = Number(sIdValue);
  studentR.push({
    id: (idValue += 10),
    studentId: Number(sIdValue),
    name: sNameValue,
    emailId: sEmailValue,
    contactNo: sContactValue,
  });
  //Storing updated array inside local_storage...
  //before storing, check a browser can support local_storage or not...
  if (typeof Storage !== "undefined") {
    localStorage.setItem("studentsRecord", JSON.stringify(studentR));
  } else {
    console.log("browser doesn't support local storage...");
  }
  //..
  displayTable();
  
}

//EditingThroughtContenteditableAttri. inside HTML
//Saving edited record in a table mean that internally arrayOfObject...
//Separate eventHandler anonymous fun() which given as argument inside addEventListener()
const addHandler = (e) => {
  let cellValue = e.target.innerText;
  let rowId = e.target.parentNode.dataset.id;
  let field = e.target.dataset.field;
  let finalObj = studentR.find((student) => student.id == rowId);
  if (finalObj) {
    finalObj[field] = cellValue;
  }
  //Storing updated array inside local_storage...
  localStorage.setItem("studentsRecord", JSON.stringify(studentR));
};
function editRecord() {
  const t_body = document.querySelector("#tableBody");
  t_body.addEventListener("blur", addHandler, true);
}
editRecord();

//Fun() for deleting record..
function deleteRecord() {
  //using Event Delegation approach...
  document.querySelector("#tableBody").addEventListener("click", (event) => {
    //Target/identify exact element in which apply click event..
    if (event.target.closest("#trashBtn")) {
      const row = event.target.closest("#trashBtn").parentNode;
      //remove row(tr) from the DOM
      row.remove();
      //remove from the arrayOfObj.
      const rowId = row.dataset.id;
      const getIndex = studentR.findIndex((stu) => stu.id == rowId);
      if (getIndex > -1) {
        studentR.splice(getIndex, 1);
        //Storing updated array inside local_storage...
        localStorage.setItem("studentsRecord", JSON.stringify(studentR));
      }
      //..
    }
  });
}
deleteRecord();

//FormValiddation...
const s_form = document.querySelector("#stuForm");
const s_Id = document.querySelector("#studentId");
const s_Name = document.querySelector("#studentName");
const s_Email = document.querySelector("#emailId");
const contactNumber = document.querySelector("#contactNum");
const finalRes = document.querySelector("#finalResult");
const idError = document.querySelector("#idError");
const nameError = document.querySelector("#nameError");
const mailError = document.querySelector("#emailError");
const contactError = document.querySelector("#contactError");

//displayError func()..
function displayError(element, msg) {
  element.innerHTML = msg;
}

//clearError func()..
function clearError(element) {
  element.innerHTML = "";
}

//student_id validation func()..
function validateId() {
  let value = s_Id.value.trim();
  if (value.length >= 8) {
    clearError(idError);
    return true;
  } else if (value.length === 0) {
    displayError(idError, "*Please fill out this field");
    return false;
  } else {
    displayError(idError, "*Student id must have at least 8 digits");
    return false;
  }
}

//name validation func()..
function validateName() {
  let name = s_Name.value.trim();
  if (name.length < 4) {
    displayError(nameError, "*Add name who has at least 4 characters");
    return false;
  } else if (!/^[a-zA-Z\s]+$/.test(name)) {
    displayError(nameError, "*Only characters are allowed!");
    return false;
  } else if (name === "") {
    displayError(nameError, "*Please fill in this field");
    return false;
  } else {
    clearError(nameError);
    return true;
  }
}

//email validation func()..
function validateEmail() {
  let email = s_Email.value.trim();
  //regexp(regular expressions)
  let pattern = /^[^\@\s]+@[^\s\@]+\.[^\s\@]+$/;
  if (!pattern.test(email)) {
    displayError(
      mailError,
      "*Please enter valid email address like char@gmail.com",
    );
    return false;
  } else {
    clearError(mailError);
    return true;
  }
}

//contact validation func()..
function validateContactNo() {
  let contact = contactNumber.value.trim();
  let pattern = /\d/g;
  if (!pattern.test(contact)) {
    displayError(contactError, "*Please enter valid contact no");
    return false;
  } else if (!(contact.length >= 10)) {
    displayError(contactError, "*Enter at least 10 digits for contact number");
    return false;
  } else {
    clearError(contactError);
    return true;
  }
}

//validateForm func()..
function validateForm() {
  let okStudentId = validateId();
  let okStudentName = validateName();
  let okEmail = validateEmail();
  let okContactNum = validateContactNo();
  return okStudentId && okStudentName && okEmail && okContactNum;
}

s_form.addEventListener("submit", (e) => {
  console.log("SUBMIT TRIGGERED");
  e.preventDefault();

  if (validateForm()) {
    finalRes.innerHTML = "Form is valid!";
    finalRes.className = "valid";
    setTimeout(() => {
      finalRes.innerHTML = "";
    }, 2000);
    addRecord();
  } else {
    finalRes.innerHTML = "Please fix all errors..";
    finalRes.className = "error";
  }
  console.log("finalRes:", finalRes);
});
