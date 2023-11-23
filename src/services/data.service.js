const { Role, Doctor, WorkingPlan, WorkingTime } = require('../models');
const moment = require('moment');

const initDataBase = async () => {
  try {
    const roles = await Role.find();
    if (roles.length === 0) {
      await Role.insertMany([
        {
          roleName: 'Khách hàng',
          roleIndex: 'khach-hang',
          isLocked: false,
        },
        {
          roleName: 'Admin',
          roleIndex: 'admin',
          isLocked: false,
        },
        {
          roleName: 'Nhân viên phê duyệt',
          roleIndex: 'nhan-vien-phe-duyet',
          isLocked: false,
        },
      ]);
    }
  } catch (error) {
    console.log(error);
  }
};

// Auto generate working plan every day
function getRandomNumber(maxValue) {
  return Math.floor(Math.random() * maxValue) + 1;
}

function generatePlace() {
  const x = getRandomNumber(9);
  const y = getRandomNumber(9);
  const z = getRandomNumber(9);
  return `Phòng khám ${x}0${y} - Tòa nhà A${z}`;
}

function generateRandomWorkingTimes() {
  const workingHours = [
    '07:00-08:00',
    '08:00-09:00',
    '09:00-10:00',
    '10:00-11:00',
    '13:00-14:00',
    '14:00-15:00',
    '15:00-16:00',
    '16:00-17:00',
  ];
  const numberOfRecords = Math.floor(Math.random() * (workingHours.length + 1));
  const shuffledWorkingHours = [...workingHours];
  for (let i = shuffledWorkingHours.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledWorkingHours[i], shuffledWorkingHours[j]] = [shuffledWorkingHours[j], shuffledWorkingHours[i]];
  }
  const selectedWorkingHours = shuffledWorkingHours.slice(0, numberOfRecords);
  const workingTimeObjects = selectedWorkingHours.map((time) => {
    const [startTime, endTime] = time.split('-');
    return { startTime, endTime };
  });
  workingTimeObjects.sort((a, b) => (a.startTime > b.startTime ? 1 : -1));
  return workingTimeObjects;
}

const autoGenerateWorkingPlanAndWorkingTime = async () => {
  const doctors = await Doctor.find();
  const currentDate = moment();
  for (let i = 0; i < 7; i++) {
    const date = currentDate.clone().add(i, 'days').format('YYYY-MM-DD');
    for (const doctor of doctors) {
      const workingPlan = await WorkingPlan.findOne({ doctor: doctor._id, date: date });
      if (!workingPlan) {
        const workingPlan = await WorkingPlan.create({ doctor: doctor._id, date: date, place: generatePlace() });
        const randomWorkingTimes = generateRandomWorkingTimes();
        for (const workingTime of randomWorkingTimes) {
          await WorkingTime.create({
            startTime: workingTime.startTime,
            endTime: workingTime.endTime,
            workingPlan: workingPlan._id,
          });
        }
      }
    }
  }
};

module.exports = { initDataBase, autoGenerateWorkingPlanAndWorkingTime };
