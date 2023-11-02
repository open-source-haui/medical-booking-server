const { Role } = require('../models');

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

module.exports = { initDataBase };
