export declare const UserRole: {
    readonly RENTER: "RENTER";
    readonly OWNER: "OWNER";
    readonly ADMIN: "ADMIN";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const CarStatus: {
    readonly PENDING: "PENDING";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
};
export type CarStatus = (typeof CarStatus)[keyof typeof CarStatus];
export declare const BookingStatus: {
    readonly CONFIRMED: "CONFIRMED";
    readonly CANCELLED: "CANCELLED";
    readonly COMPLETED: "COMPLETED";
};
export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];
export declare const CarType: {
    readonly HATCHBACK: "HATCHBACK";
    readonly SEDAN: "SEDAN";
    readonly SUV: "SUV";
    readonly MUV: "MUV";
    readonly LUXURY: "LUXURY";
    readonly ELECTRIC: "ELECTRIC";
};
export type CarType = (typeof CarType)[keyof typeof CarType];
export declare const Transmission: {
    readonly MANUAL: "MANUAL";
    readonly AUTOMATIC: "AUTOMATIC";
};
export type Transmission = (typeof Transmission)[keyof typeof Transmission];
export declare const FuelType: {
    readonly PETROL: "PETROL";
    readonly DIESEL: "DIESEL";
    readonly ELECTRIC: "ELECTRIC";
    readonly HYBRID: "HYBRID";
    readonly CNG: "CNG";
};
export type FuelType = (typeof FuelType)[keyof typeof FuelType];
export declare const ActivityAction: {
    readonly CREATE: "CREATE";
    readonly UPDATE: "UPDATE";
    readonly DELETE: "DELETE";
    readonly APPROVE: "APPROVE";
    readonly REJECT: "REJECT";
    readonly CANCEL: "CANCEL";
    readonly LOGIN: "LOGIN";
};
export type ActivityAction = (typeof ActivityAction)[keyof typeof ActivityAction];
