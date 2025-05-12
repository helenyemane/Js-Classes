//1
function FeatureToggle(featureName, isEnabled, userGroupAccess) {
  this.featureName = featureName;
  this.isEnabled = isEnabled;
  this.userGroupAccess = userGroupAccess;
}
FeatureToggle.prototype.canAccess = function (userRole) {
  return this.isEnabled && this.userGroupAccess.includes(userRole);
};
FeatureToggle.prototype.toggleFeature = function (flag) {
  this.isEnabled = flag;
};
let featureDemand = new FeatureToggle("Backend Development", false, ["admins", "betaTesters"]);
console.log(featureDemand.canAccess("regular user"));
featureDemand.toggleFeature(true);
console.log(featureDemand);
let userRole = "admins";
if (featureDemand.canAccess(userRole)) {
  console.log("Access granted to feature.");
} else {
  switch (userRole) {
      case "admins":
      case "betaTesters":
          console.log("Feature is not enabled.");
          break;
      default:
          console.log("Access denied.");
  }
};


// 2
function TimeLog(freelancerName, projectDetails,logs) {
  this.freelancerName = freelancerName;
  this.projectDetails = projectDetails;
  this.logs = logs;
};
TimeLog.prototype.calculateTotalEarning = function () {
  return this.logs.reduce((total, entry) => {
      return total + (entry.hoursWorked * this.projectDetails.hourlyRate);
  }, 0);
};


TimeLog.prototype.getEntriesInDateRange = function (startDate, endDate) {
  return this.logs.filter(log => log.date >= startDate && log.date <= endDate);
};
TimeLog.prototype.hasExceededWeeklyHours = function () {
  let totalHours = this.logs.reduce((sum, log) => sum + log.hoursWorked, 0);
  if (totalHours > 40) {
    console.log(`${this.freelancerName} worked more this week.`);
  } else {
    console.log(`${this.freelancerName} worked Within normal hours this week.`);
  };
};
const finalProject = new TimeLog("Fana Berhe",
  { name: "design for a company", hourlyRate: 60 }, 
  [
  { date: "2025-03-19", hoursWorked: 5 },
  { date: "2025-03-20", hoursWorked: 6 },
  { date: "2025-03-05", hoursWorked: 8 },
  { date: "2025-03-02", hoursWorked: 9 },
  { date: "2025-03-20", hoursWorked: 11},
  { date: "2025-03-16", hoursWorked: 5 },
]);
finalProject.hasExceededWeeklyHours();
console.log(finalProject.getEntriesInDateRange("2025-01-01","2025-03-10"));
console.log(finalProject.calculateTotalEarning());


// 3
function Order(customerInfo, itemsList, status) {
  this.customerInfo = customerInfo;
  this.itemsList = itemsList;
  this.status = status;
}
Order.prototype.calculateTotalCost = function () {
  return this.itemsList.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);
};
Order.prototype.updateStatus = function (paymentReceived) {
  return this.calculateTotalCost()===paymentReceived ? "Paid" : "Pending";
};
Order.prototype.filterUrgentCategory = function () {
  switch (this.status) {
      case "Pending":
        console.log("Order needs priority.");
        break;
      case "Paid":
        console.log("Order is ready.");
        break;
      default:
        console.log("Unknown status.");
        break;
    };
 
};
const customerOrder=new Order({name:"Helen",email:"helenyemane@gmail.com"},
  [
      { productName: "phone", quantity: 1, unitPrice: 12000 },
      { productName: "earpods", quantity: 1, unitPrice: 2500 },
      { productName: "charger", quantity: 1, unitPrice: 750 }
    ],"Pending" 
);
console.log(customerOrder.calculateTotalCost());
console.log(customerOrder.updateStatus(12300));
customerOrder.filterUrgentCategory();
// 4
function Employee(id, name, performanceMetrics,feedbackList) {
  this.id = id;
  this.name = name;
  this.performanceMetrics = performanceMetrics;
  this.feedbackList =feedbackList;
}
Employee.prototype.calculateAverageScore = function () {
  const scores = Object.values(this.performanceMetrics);
  const totalScore = scores.reduce((sum, score) => sum + score, 0);
  return totalScore / scores.length;
};
Employee.prototype.getPerformanceLevel = function () {
  const averageScore = this.calculateAverageScore();
  if (averageScore >= 4.5) {
      return "Excellent";
  } else if (averageScore >= 3.5) {
      return "Good";
  } else {
      return "Needs Improvement";
  }
};
Employee.prototype.addFeedback = function (comment) {
  this.feedbackList.push(comment);
};
const employeelevel=new Employee(12345,"Hagos Teka",
  {communication:60,
  reliability:93,
  efficiency:75},
["Good start", "You need to improve on communication skills", "You need to work on collaboration"]

);
employeelevel.addFeedback("continue the good work");
console.log(employeelevel);
console.log(employeelevel.calculateAverageScore());
console.log(employeelevel.getPerformanceLevel());


// 5
function Course(title, instructor,students) {
  this.title = title;
  this.instructor = instructor;
  this.students =students;
}
Course.prototype.getCompletedStudentNames = function () {
  return this.students
      .filter(student => student.completionStatus)
      .map(student => student.name);
};
Course.prototype.countStudentsByExpertise= function () {
  const expertiseCounts = {};
  this.students.forEach(student => {
      const expertise = student.expertise;
      if (!expertiseCounts[expertise]) {
          expertiseCounts[expertise] = 0;
      }
      expertiseCounts[expertise]++;
  });
  return expertiseCounts;
};
Course.prototype.instructorMessage = function () {
  return this.students.length > 5
      ? "You have a full class!"
      : "Consider recruiting more students.";
};
const coursesList=new Course("Frontend Development",
  {name: "Berhe Alemu", expertise: "Designer" },
  [
      { name: "Nahom", completionStatus: true, expertise: "Data Analysis" },
      { name: "Tesfay", completionStatus: false, expertise: "Data Analysis" },
      { name: "Alem", completionStatus: true, expertise: "Web Development" },
      { name: "Belay", completionStatus: true, expertise: "Web Development" },
      { name: "Yemane", completionStatus: false, expertise: "Data Analysis" }
    ]
   
   
);
console.log(coursesList.instructorMessage());
console.log(coursesList.getCompletedStudentNames());
console.log(coursesList.countStudentsByExpertise());

