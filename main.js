
    // =============================
    // DOM Selection
    // =============================
    const loginSection = document.getElementById('loginSection');
    const appSection = document.getElementById('appSection');
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const navButtons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');

    const studentForm = document.getElementById('studentForm');
    const studentIndex = document.getElementById('studentIndex');
    const studentName = document.getElementById('studentName');
    const studentAge = document.getElementById('studentAge');
    const studentDepartment = document.getElementById('studentDepartment');
    const studentGrade = document.getElementById('studentGrade');
    const studentsTableBody = document.getElementById('studentsTableBody');
    const studentSearch = document.getElementById('studentSearch');

    const courseForm = document.getElementById('courseForm');
    const courseIndex = document.getElementById('courseIndex');
    const courseName = document.getElementById('courseName');
    const courseInstructor = document.getElementById('courseInstructor');
    const courseHours = document.getElementById('courseHours');
    const coursesTableBody = document.getElementById('coursesTableBody');

    const announcementForm = document.getElementById('announcementForm');
    const announcementIndex = document.getElementById('announcementIndex');
    const announcementTitle = document.getElementById('announcementTitle');
    const announcementContent = document.getElementById('announcementContent');
    const announcementsList = document.getElementById('announcementsList');

    const studentsCount = document.getElementById('studentsCount');
    const coursesCount = document.getElementById('coursesCount');
    const announcementsCount = document.getElementById('announcementsCount');
    const seedDataBtn = document.getElementById('seedDataBtn');

    // =============================
    // Data Storage
    // =============================
    let students = JSON.parse(localStorage.getItem('students')) || [];
    let courses = JSON.parse(localStorage.getItem('courses')) || [];
    let announcements = JSON.parse(localStorage.getItem('announcements')) || [];
     // =============================
    // Navigation Logic
    // =============================
    navButtons.forEach((button) => {
      button.addEventListener('click', function () {
        showPage(this.dataset.page);
      });
    });

    // =============================
    // Helper Functions
    // =============================
    function saveData() {
      localStorage.setItem('students', JSON.stringify(students));
      localStorage.setItem('courses', JSON.stringify(courses));
      localStorage.setItem('announcements', JSON.stringify(announcements));
    }

    function updateDashboard() {
      studentsCount.textContent = students.length;
      coursesCount.textContent = courses.length;
      announcementsCount.textContent = announcements.length;
    }

    function showPage(pageId) {
      pages.forEach((page) => page.classList.remove('active'));
      navButtons.forEach((button) => button.classList.remove('active'));

      document.getElementById(pageId).classList.add('active');

      const selectedButton = document.querySelector(`[data-page="${pageId}"]`);
      if (selectedButton) {
        selectedButton.classList.add('active');
      }
    }

    function actionButtons(type, index) {
      return `
        <div class="actions">
          <button class="btn btn-warning" onclick="edit${type}(${index})">Edit</button>
          <button class="btn btn-danger" onclick="delete${type}(${index})">Delete</button>
        </div>
      `;
    }

    // =============================
    // Login Logic
    // =============================
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();

      if (username === 'admin' && password === '1234') {
        loginSection.classList.add('hidden');
        appSection.classList.remove('hidden');
      } else {
        alert('Wrong username or password');
      }
    });

    logoutBtn.addEventListener('click', function () {
      appSection.classList.add('hidden');
      loginSection.classList.remove('hidden');
      loginForm.reset();
    });

   

    // =============================
    // Students CRUD
    // =============================
    function renderStudents(list = students) {
      studentsTableBody.innerHTML = '';

      list.forEach((student) => {
        const studentIndexValue = students.indexOf(student);

        studentsTableBody.innerHTML += `
          <tr>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.department}</td>
            <td>${student.grade}</td>
            <td>${actionButtons('Student', studentIndexValue)}</td>
          </tr>
        `;
      });
    }

    studentForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const studentData = {
        name: studentName.value.trim(),
        age: studentAge.value,
        department: studentDepartment.value.trim(),
        grade: studentGrade.value
      };

      if (studentIndex.value === '') {
        students.push(studentData);
      } else {
        students[studentIndex.value] = studentData;
      }

      saveData();
      renderStudents();
      updateDashboard();
      studentForm.reset();
      studentIndex.value = '';
    });

    function editStudent(index) {
      const student = students[index];
      studentIndex.value = index;
      studentName.value = student.name;
      studentAge.value = student.age;
      studentDepartment.value = student.department;
      studentGrade.value = student.grade;
      showPage('studentsPage');
    }

    function deleteStudent(index) {
      students.splice(index, 1);
      saveData();
      renderStudents();
      updateDashboard();
    }

    studentSearch.addEventListener('input', function () {
      const searchText = this.value.toLowerCase();
      const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchText)
      );

      renderStudents(filteredStudents);
    });

    // =============================
    // Courses CRUD
    // =============================
    function renderCourses() {
      coursesTableBody.innerHTML = '';

      courses.forEach((course, index) => {
        coursesTableBody.innerHTML += `
          <tr>
            <td>${course.name}</td>
            <td>${course.instructor}</td>
            <td>${course.hours}</td>
            <td>${actionButtons('Course', index)}</td>
          </tr>
        `;
      });
    }

    courseForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const courseData = {
        name: courseName.value.trim(),
        instructor: courseInstructor.value.trim(),
        hours: courseHours.value
      };

      if (courseIndex.value === '') {
        courses.push(courseData);
      } else {
        courses[courseIndex.value] = courseData;
      }

      saveData();
      renderCourses();
      updateDashboard();
      courseForm.reset();
      courseIndex.value = '';
    });

    function editCourse(index) {
      const course = courses[index];
      courseIndex.value = index;
      courseName.value = course.name;
      courseInstructor.value = course.instructor;
      courseHours.value = course.hours;
      showPage('coursesPage');
    }

    function deleteCourse(index) {
      courses.splice(index, 1);
      saveData();
      renderCourses();
      updateDashboard();
    }

    // =============================
    // Announcements CRUD
    // =============================
    function renderAnnouncements() {
      announcementsList.innerHTML = '';

      if (announcements.length === 0) {
        announcementsList.innerHTML = '<p class="subtitle">No announcements yet.</p>';
        return;
      }

      announcements.forEach((announcement, index) => {
        announcementsList.innerHTML += `
          <div class="announcement-item">
            <h3>${announcement.title}</h3>
            <p>${announcement.content}</p>
            ${actionButtons('Announcement', index)}
          </div>
        `;
      });
    }

    announcementForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const announcementData = {
        title: announcementTitle.value.trim(),
        content: announcementContent.value.trim()
      };

      if (announcementIndex.value === '') {
        announcements.push(announcementData);
      } else {
        announcements[announcementIndex.value] = announcementData;
      }

      saveData();
      renderAnnouncements();
      updateDashboard();
      announcementForm.reset();
      announcementIndex.value = '';
    });

    function editAnnouncement(index) {
      const announcement = announcements[index];
      announcementIndex.value = index;
      announcementTitle.value = announcement.title;
      announcementContent.value = announcement.content;
      showPage('announcementsPage');
    }

    function deleteAnnouncement(index) {
      announcements.splice(index, 1);
      saveData();
      renderAnnouncements();
      updateDashboard();
    }

    // =============================
    // Demo Data
    // =============================
    seedDataBtn.addEventListener('click', function () {
      students = [
        { name: 'Ali Hassan', age: 20, department: 'Computer Science', grade: 90 },
        { name: 'Mona Adel', age: 21, department: 'Information Systems', grade: 85 },
        { name: 'Omar Khaled', age: 22, department: 'Information Technology', grade: 93 },
        { name: 'Sara Ahmed', age: 20, department: 'Business Administration', grade: 88 }
      ];

      courses = [
        { name: 'JavaScript', instructor: 'Dr. Ahmed', hours: 3 },
        { name: 'Database Systems', instructor: 'Dr. Sara', hours: 2 },
        { name: 'Data Structures', instructor: 'Dr. Hany', hours: 3 },
        { name: 'Machine Learning', instructor: 'Dr. Laila', hours: 4 }
      ];

      announcements = [
        { title: 'Midterm Exam', content: 'The midterm exam will be held next Sunday.' },
        { title: 'Project Submission', content: 'Submit your project before Thursday.' },
        { title: 'Guest Lecture', content: 'A guest lecture about technology careers will be held tomorrow.' }
      ];

      saveData();
      renderStudents();
      renderCourses();
      renderAnnouncements();
      updateDashboard();
      alert('Sample data loaded.');
    });

    // =============================
    // Initial Render
    // =============================
    renderStudents();
    renderCourses();
    renderAnnouncements();
    updateDashboard();
  