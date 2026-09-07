"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityAction = exports.FuelType = exports.Transmission = exports.CarType = exports.BookingStatus = exports.CarStatus = exports.UserRole = void 0;
exports.UserRole = {
    RENTER: 'RENTER',
    OWNER: 'OWNER',
    ADMIN: 'ADMIN'
};
exports.CarStatus = {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED'
};
exports.BookingStatus = {
    CONFIRMED: 'CONFIRMED',
    CANCELLED: 'CANCELLED',
    COMPLETED: 'COMPLETED'
};
exports.CarType = {
    HATCHBACK: 'HATCHBACK',
    SEDAN: 'SEDAN',
    SUV: 'SUV',
    MUV: 'MUV',
    LUXURY: 'LUXURY',
    ELECTRIC: 'ELECTRIC'
};
exports.Transmission = {
    MANUAL: 'MANUAL',
    AUTOMATIC: 'AUTOMATIC'
};
exports.FuelType = {
    PETROL: 'PETROL',
    DIESEL: 'DIESEL',
    ELECTRIC: 'ELECTRIC',
    HYBRID: 'HYBRID',
    CNG: 'CNG'
};
exports.ActivityAction = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    APPROVE: 'APPROVE',
    REJECT: 'REJECT',
    CANCEL: 'CANCEL',
    LOGIN: 'LOGIN'
};
//# sourceMappingURL=enums.js.map