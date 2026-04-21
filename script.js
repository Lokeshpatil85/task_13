// ============================================
// STUDENT MANAGEMENT SYSTEM
// Using Arrays, Objects, Loops & Conditions
// ============================================

// 1️⃣ ARRAY - Stores all student objects
let students = [];

// 2️⃣ OBJECT - Student structure
// Each student is an object with properties:
// { id, name, age, grade, course }

// Current filter
let currentFilter = 'all';

// ============================================
// ADD STUDENT (Create Object)
// ============================================
function addStudent() {
    // Get values from input fields
    const name = document.getElementById('studentName').value.trim();
    const age = parseInt(document.getElementById('studentAge').value);
    const grade = document.getElementById('studentGrade').value;
    const course = document.getElementById('studentCourse').value.trim();
    
    // 3️⃣ CONDITION - Validate input
    if (name === '') {
        showOutput('❌ Error: Please enter student name', 'error');
        return;
    }
    
    if (isNaN(age) || age < 5 || age > 100) {
        showOutput('❌ Error: Please enter valid age (5-100)', 'error');
        return;
    }
    
    if (course === '') {
        showOutput('❌ Error: Please enter course name', 'error');
        return;
    }
    
    // Create new student OBJECT
    const newStudent = {
        id: students.length + 1,
        name: name,
        age: age,
        grade: grade,
        course: course,
        // Computed property based on grade
        status: getStatusFromGrade(grade)
    };
    
    // Add to ARRAY
    students.push(newStudent);
    
    // Clear input fields
    document.getElementById('studentName').value = '';
    document.getElementById('studentAge').value = '';
    document.getElementById('studentCourse').value = '';
    
    // Update display
    displayStudents();
    updateStatistics();
    showOutput(`✅ Student "${name}" added successfully!`, 'success');
}

// Helper function to get status from grade
function getStatusFromGrade(grade) {
    // 4️⃣ CONDITION - Multiple conditions with if-else
    if (grade === 'A' || grade === 'B' || grade === 'C') {
        return 'Passing';
    } else {
        return 'Failing';
    }
}

// ============================================
// DISPLAY STUDENTS (Using LOOP)
// ============================================
function displayStudents() {
    const studentList = document.getElementById('studentList');
    
    // 5️⃣ CONDITION - Check if array is empty
    if (students.length === 0) {
        studentList.innerHTML = '<li style="text-align: center; color: #999;">No students added yet</li>';
        return;
    }
    
    // 6️⃣ LOOP - for...of loop to iterate through array
    let filteredStudents = students;
    
    // Apply filter
    if (currentFilter === 'pass') {
        filteredStudents = students.filter(s => s.status === 'Passing');
    } else if (currentFilter === 'fail') {
        filteredStudents = students.filter(s => s.status === 'Failing');
    } else if (currentFilter !== 'all') {
        filteredStudents = students.filter(s => s.grade === currentFilter);
    }
    
    if (filteredStudents.length === 0) {
        studentList.innerHTML = '<li style="text-align: center; color: #999;">No students match this filter</li>';
        return;
    }
    
    // Clear the list
    studentList.innerHTML = '';
    
    // 7️⃣ LOOP - for loop with index
    for (let i = 0; i < filteredStudents.length; i++) {
        const student = filteredStudents[i];
        const li = document.createElement('li');
        
        // Get grade color based on CONDITION
        let gradeColor = '';
        if (student.grade === 'A') gradeColor = '#4caf50';
        else if (student.grade === 'B') gradeColor = '#2196f3';
        else if (student.grade === 'C') gradeColor = '#ff9800';
        else gradeColor = '#f44336';
        
        li.innerHTML = `
            <div class="student-info">
                <div class="student-name">${student.name}</div>
                <div class="student-details">
                    Age: ${student.age} | Course: ${student.course} | 
                    Grade: <span style="color: ${gradeColor}; font-weight: bold;">${student.grade}</span>
                    | Status: ${student.status}
                </div>
            </div>
            <button class="delete-btn" onclick="deleteStudent(${student.id})">Delete</button>
        `;
        studentList.appendChild(li);
    }
}

// ============================================
// DELETE STUDENT
// ============================================
function deleteStudent(id) {
    // 8️⃣ ARRAY METHOD - filter to remove student
    const deletedStudent = students.find(s => s.id === id);
    students = students.filter(student => student.id !== id);
    
    displayStudents();
    updateStatistics();
    showOutput(`🗑️ Student "${deletedStudent?.name}" deleted`, 'info');
}

// ============================================
// UPDATE STATISTICS (Using LOOP)
// ============================================
function updateStatistics() {
    const total = students.length;
    
    if (total === 0) {
        document.getElementById('totalStudents').textContent = '0';
        document.getElementById('avgAge').textContent = '0';
        document.getElementById('passPercent').textContent = '0%';
        return;
    }
    
    // 9️⃣ LOOP - forEach to calculate total age
    let totalAge = 0;
    students.forEach(student => {
        totalAge += student.age;
    });
    const avgAge = (totalAge / total).toFixed(1);
    
    // Count passing students using CONDITION in loop
    let passingCount = 0;
    for (let student of students) {
        if (student.status === 'Passing') {
            passingCount++;
        }
    }
    const passPercent = ((passingCount / total) * 100).toFixed(0);
    
    // Update HTML
    document.getElementById('totalStudents').textContent = total;
    document.getElementById('avgAge').textContent = avgAge;
    document.getElementById('passPercent').textContent = passPercent + '%';
}

// ============================================
// FILTER STUDENTS
// ============================================
function filterStudents(filter) {
    currentFilter = filter;
    
    // Update active button styling
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(filter.toLowerCase()) ||
            (filter === 'pass' && btn.textContent === 'Passing') ||
            (filter === 'fail' && btn.textContent === 'Failing')) {
            btn.classList.add('active');
        }
    });
    
    displayStudents();
    showOutput(`🔍 Filter applied: ${filter.toUpperCase()}`, 'info');
}

// ============================================
// SEARCH STUDENT
// ============================================
function searchStudent() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (searchTerm === '') {
        displayStudents();
        return;
    }
    
    // 1️⃣0️⃣ ARRAY METHOD + CONDITION - filter with condition
    const results = students.filter(student => 
        student.name.toLowerCase().includes(searchTerm)
    );
    
    const studentList = document.getElementById('studentList');
    
    if (results.length === 0) {
        studentList.innerHTML = '<li style="text-align: center; color: #999;">No matching students found</li>';
        return;
    }
    
    studentList.innerHTML = '';
    results.forEach(student => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="student-info">
                <div class="student-name">${student.name}</div>
                <div class="student-details">
                    Age: ${student.age} | Grade: ${student.grade} | Course: ${student.course}
                </div>
            </div>
        `;
        studentList.appendChild(li);
    });
}

// ============================================
// DEMO FUNCTIONS FOR LEARNING
// ============================================

// 1️⃣1️⃣ ARRAY METHODS DEMO
function demoArrayMethods() {
    let output = "========== ARRAY METHODS DEMO ==========\n\n";
    
    // map() - Transform each element
    const studentNames = students.map(s => s.name);
    output += `📌 map() - Student names: [${studentNames.join(', ')}]\n\n`;
    
    // filter() - Get specific items
    const adults = students.filter(s => s.age >= 18);
    output += `📌 filter() - Adult students (18+): ${adults.length}\n\n`;
    
    // find() - Find first match
    const firstAGrade = students.find(s => s.grade === 'A');
    output += `📌 find() - First A grade student: ${firstAGrade?.name || 'None'}\n\n`;
    
    // some() - Check if any matches condition
    const hasFailures = students.some(s => s.status === 'Failing');
    output += `📌 some() - Any failing students? ${hasFailures ? 'Yes' : 'No'}\n\n`;
    
    // every() - Check if all match condition
    const allAdults = students.every(s => s.age >= 18);
    output += `📌 every() - All students adults? ${allAdults ? 'Yes' : 'No'}\n\n`;
    
    // reduce() - Accumulate values
    const totalAge = students.reduce((sum, s) => sum + s.age, 0);
    output += `📌 reduce() - Total age of all students: ${totalAge}`;
    
    showOutput(output, 'demo');
}

// 1️⃣2️⃣ LOOP TYPES DEMO
function demoLoopTypes() {
    if (students.length === 0) {
        showOutput("⚠️ Please add some students first!", 'error');
        return;
    }
    
    let output = "========== LOOP TYPES DEMO ==========\n\n";
    
    // for loop (traditional)
    output += "1️⃣ for loop (with index):\n";
    for (let i = 0; i < students.length; i++) {
        output += `   ${i+1}. ${students[i].name}\n`;
    }
    
    // for...of loop
    output += "\n2️⃣ for...of loop:\n";
    for (let student of students) {
        output += `   📚 ${student.name} - ${student.course}\n`;
    }
    
    // forEach loop
    output += "\n3️⃣ forEach loop:\n";
    students.forEach((student, index) => {
        output += `   ${index+1}. ${student.name} (Age: ${student.age})\n`;
    });
    
    // while loop
    output += "\n4️⃣ while loop:\n";
    let i = 0;
    while (i < students.length && i < 3) {
        output += `   ${students[i].name}\n`;
        i++;
    }
    
    showOutput(output, 'demo');
}

// 1️⃣3️⃣ OBJECT METHODS DEMO
function demoObjectMethods() {
    if (students.length === 0) {
        showOutput("⚠️ Please add some students first!", 'error');
        return;
    }
    
    let output = "========== OBJECT METHODS DEMO ==========\n\n";
    
    // Show first student as example
    const exampleStudent = students[0];
    
    output += "📌 Student Object Example:\n";
    output += `   ${JSON.stringify(exampleStudent, null, 2)}\n\n`;
    
    output += "📌 Accessing Object Properties:\n";
    output += `   Dot notation: ${exampleStudent.name}\n`;
    output += `   Bracket notation: ${exampleStudent['age']}\n\n`;
    
    output += "📌 Object.keys() - Get all keys:\n";
    output += `   ${Object.keys(exampleStudent).join(', ')}\n\n`;
    
    output += "📌 Object.values() - Get all values:\n";
    output += `   ${Object.values(exampleStudent).join(', ')}\n\n`;
    
    output += "📌 Object.entries() - Get key-value pairs:\n";
    Object.entries(exampleStudent).forEach(([key, value]) => {
        output += `   ${key}: ${value}\n`;
    });
    
    showOutput(output, 'demo');
}

// 1️⃣4️⃣ CONDITIONS DEMO
function demoConditions() {
    let output = "========== CONDITIONS DEMO ==========\n\n";
    
    output += "📌 if-else statement:\n";
    const sampleAge = 18;
    if (sampleAge >= 18) {
        output += `   Age ${sampleAge} → Adult\n`;
    } else {
        output += `   Age ${sampleAge} → Minor\n`;
    }
    
    output += "\n📌 if-else if-else (Multiple conditions):\n";
    const sampleGrade = 85;
    if (sampleGrade >= 90) output += `   ${sampleGrade}% → Grade A\n`;
    else if (sampleGrade >= 80) output += `   ${sampleGrade}% → Grade B\n`;
    else if (sampleGrade >= 70) output += `   ${sampleGrade}% → Grade C\n`;
    else if (sampleGrade >= 60) output += `   ${sampleGrade}% → Grade D\n`;
    else output += `   ${sampleGrade}% → Grade F\n`;
    
    output += "\n📌 switch statement:\n";
    const day = "Monday";
    switch(day) {
        case "Monday": output += "   Start of work week!\n"; break;
        case "Friday": output += "   Weekend is coming!\n"; break;
        default: output += "   Regular day\n";
    }
    
    output += "\n📌 Ternary operator (shortcut):\n";
    const isPassing = sampleGrade >= 60 ? "Pass" : "Fail";
    output += `   ${sampleGrade}% → ${isPassing}\n`;
    
    output += "\n📌 Logical operators (&&, ||, !):\n";
    const hasName = students.length > 0;
    const hasGradeA = students.some(s => s.grade === 'A');
    output += `   Has students? ${hasName}\n`;
    output += `   Has Grade A? ${hasGradeA}\n`;
    output += `   Both conditions true? ${hasName && hasGradeA}\n`;
    
    showOutput(output, 'demo');
}

// 1️⃣5️⃣ Calculate Class Average
function calculateClassAverage() {
    if (students.length === 0) {
        showOutput("⚠️ No students to calculate average!", 'error');
        return;
    }
    
    // Map grades to numeric values
    const gradePoints = {
        'A': 90, 'B': 80, 'C': 70, 'D': 60, 'F': 50
    };
    
    let totalPoints = 0;
    for (let student of students) {
        totalPoints += gradePoints[student.grade];
    }
    
    const average = (totalPoints / students.length).toFixed(1);
    let classRating = '';
    
    // Nested conditions
    if (average >= 90) classRating = 'Excellent! 🎉';
    else if (average >= 80) classRating = 'Good Job! 👍';
    else if (average >= 70) classRating = 'Average 📚';
    else classRating = 'Needs Improvement ⚠️';
    
    showOutput(`📊 Class Average Score: ${average}%\n🏆 Rating: ${classRating}`, 'success');
}

// 1️⃣6️⃣ Find Top Student
function findTopStudent() {
    if (students.length === 0) {
        showOutput("⚠️ No students to evaluate!", 'error');
        return;
    }
    
    const gradeOrder = {'A': 5, 'B': 4, 'C': 3, 'D': 2, 'F': 1};
    
    let topStudent = students[0];
    for (let student of students) {
        if (gradeOrder[student.grade] > gradeOrder[topStudent.grade]) {
            topStudent = student;
        }
    }
    
    showOutput(`🏆 Top Student: ${topStudent.name}\n📚 Grade: ${topStudent.grade}\n📖 Course: ${topStudent.course}`, 'success');
}

// ============================================
// HELPER FUNCTION - Show Output
// ============================================
function showOutput(message, type = 'info') {
    const outputArea = document.getElementById('outputArea');
    const timestamp = new Date().toLocaleTimeString();
    
    let color = '#d4d4d4';
    if (type === 'error') color = '#f44336';
    if (type === 'success') color = '#4caf50';
    if (type === 'demo') color = '#ff9800';
    
    const newLine = document.createElement('div');
    newLine.style.color = color;
    newLine.style.marginBottom = '8px';
    newLine.style.borderBottom = '1px solid #333';
    newLine.style.paddingBottom = '5px';
    newLine.innerHTML = `[${timestamp}] ${message.replace(/\n/g, '<br>')}`;
    
    outputArea.appendChild(newLine);
    outputArea.scrollTop = outputArea.scrollHeight;
    
    // Keep only last 20 messages
    while (outputArea.children.length > 20) {
        outputArea.removeChild(outputArea.firstChild);
    }
}

// ============================================
// SAMPLE DATA FOR DEMONSTRATION
// ============================================
function loadSampleData() {
    students = [
        { id: 1, name: 'Alice Johnson', age: 20, grade: 'A', course: 'JavaScript', status: 'Passing' },
        { id: 2, name: 'Bob Smith', age: 22, grade: 'B', course: 'Python', status: 'Passing' },
        { id: 3, name: 'Charlie Brown', age: 19, grade: 'C', course: 'HTML/CSS', status: 'Passing' },
        { id: 4, name: 'Diana Prince', age: 21, grade: 'A', course: 'React', status: 'Passing' },
        { id: 5, name: 'Eve Wilson', age: 18, grade: 'F', course: 'Databases', status: 'Failing' }
    ];
    
    displayStudents();
    updateStatistics();
    showOutput('📚 Sample data loaded! Try the demo buttons.', 'success');
}

// Load sample data on page load
window.onload = function() {
    loadSampleData();
};