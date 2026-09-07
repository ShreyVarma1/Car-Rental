import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type UserModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type UserMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    email: string | null;
    phone: string | null;
    passwordHash: string | null;
    drivingLicense: string | null;
    role: $Enums.UserRole | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    email: string | null;
    phone: string | null;
    passwordHash: string | null;
    drivingLicense: string | null;
    role: $Enums.UserRole | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserCountAggregateOutputType = {
    id: number;
    name: number;
    email: number;
    phone: number;
    passwordHash: number;
    drivingLicense: number;
    role: number;
    isActive: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type UserMinAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    phone?: true;
    passwordHash?: true;
    drivingLicense?: true;
    role?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserMaxAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    phone?: true;
    passwordHash?: true;
    drivingLicense?: true;
    role?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserCountAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    phone?: true;
    passwordHash?: true;
    drivingLicense?: true;
    role?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserCountAggregateInputType;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser[P]> : Prisma.GetScalarType<T[P], AggregateUser[P]>;
};
export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithAggregationInput | Prisma.UserOrderByWithAggregationInput[];
    by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum;
    having?: Prisma.UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type UserGroupByOutputType = {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    passwordHash: string;
    drivingLicense: string | null;
    role: $Enums.UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>;
}>>;
export type UserWhereInput = {
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    id?: Prisma.StringFilter<"User"> | string;
    name?: Prisma.StringFilter<"User"> | string;
    email?: Prisma.StringFilter<"User"> | string;
    phone?: Prisma.StringNullableFilter<"User"> | string | null;
    passwordHash?: Prisma.StringFilter<"User"> | string;
    drivingLicense?: Prisma.StringNullableFilter<"User"> | string | null;
    role?: Prisma.EnumUserRoleFilter<"User"> | $Enums.UserRole;
    isActive?: Prisma.BoolFilter<"User"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    cars?: Prisma.CarListRelationFilter;
    bookings?: Prisma.BookingListRelationFilter;
    reviews?: Prisma.ReviewListRelationFilter;
    notifications?: Prisma.NotificationListRelationFilter;
    activityLogs?: Prisma.ActivityLogListRelationFilter;
    refreshSessions?: Prisma.RefreshSessionListRelationFilter;
};
export type UserOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    drivingLicense?: Prisma.SortOrderInput | Prisma.SortOrder;
    role?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    cars?: Prisma.CarOrderByRelationAggregateInput;
    bookings?: Prisma.BookingOrderByRelationAggregateInput;
    reviews?: Prisma.ReviewOrderByRelationAggregateInput;
    notifications?: Prisma.NotificationOrderByRelationAggregateInput;
    activityLogs?: Prisma.ActivityLogOrderByRelationAggregateInput;
    refreshSessions?: Prisma.RefreshSessionOrderByRelationAggregateInput;
};
export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    email?: string;
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    name?: Prisma.StringFilter<"User"> | string;
    phone?: Prisma.StringNullableFilter<"User"> | string | null;
    passwordHash?: Prisma.StringFilter<"User"> | string;
    drivingLicense?: Prisma.StringNullableFilter<"User"> | string | null;
    role?: Prisma.EnumUserRoleFilter<"User"> | $Enums.UserRole;
    isActive?: Prisma.BoolFilter<"User"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    cars?: Prisma.CarListRelationFilter;
    bookings?: Prisma.BookingListRelationFilter;
    reviews?: Prisma.ReviewListRelationFilter;
    notifications?: Prisma.NotificationListRelationFilter;
    activityLogs?: Prisma.ActivityLogListRelationFilter;
    refreshSessions?: Prisma.RefreshSessionListRelationFilter;
}, "id" | "email">;
export type UserOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    drivingLicense?: Prisma.SortOrderInput | Prisma.SortOrder;
    role?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserCountOrderByAggregateInput;
    _max?: Prisma.UserMaxOrderByAggregateInput;
    _min?: Prisma.UserMinOrderByAggregateInput;
};
export type UserScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"User"> | string;
    name?: Prisma.StringWithAggregatesFilter<"User"> | string;
    email?: Prisma.StringWithAggregatesFilter<"User"> | string;
    phone?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    passwordHash?: Prisma.StringWithAggregatesFilter<"User"> | string;
    drivingLicense?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    role?: Prisma.EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole;
    isActive?: Prisma.BoolWithAggregatesFilter<"User"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
};
export type UserCreateInput = {
    id?: string;
    name: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    drivingLicense?: string | null;
    role?: $Enums.UserRole;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    cars?: Prisma.CarCreateNestedManyWithoutOwnerInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutRenterInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutRenterInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    activityLogs?: Prisma.ActivityLogCreateNestedManyWithoutUserInput;
    refreshSessions?: Prisma.RefreshSessionCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateInput = {
    id?: string;
    name: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    drivingLicense?: string | null;
    role?: $Enums.UserRole;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    cars?: Prisma.CarUncheckedCreateNestedManyWithoutOwnerInput;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutRenterInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutRenterInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    activityLogs?: Prisma.ActivityLogUncheckedCreateNestedManyWithoutUserInput;
    refreshSessions?: Prisma.RefreshSessionUncheckedCreateNestedManyWithoutUserInput;
};
export type UserUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    drivingLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cars?: Prisma.CarUpdateManyWithoutOwnerNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutRenterNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutRenterNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    activityLogs?: Prisma.ActivityLogUpdateManyWithoutUserNestedInput;
    refreshSessions?: Prisma.RefreshSessionUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    drivingLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cars?: Prisma.CarUncheckedUpdateManyWithoutOwnerNestedInput;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutRenterNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutRenterNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    activityLogs?: Prisma.ActivityLogUncheckedUpdateManyWithoutUserNestedInput;
    refreshSessions?: Prisma.RefreshSessionUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateManyInput = {
    id?: string;
    name: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    drivingLicense?: string | null;
    role?: $Enums.UserRole;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    drivingLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    drivingLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    drivingLicense?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    drivingLicense?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    drivingLicense?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserScalarRelationFilter = {
    is?: Prisma.UserWhereInput;
    isNot?: Prisma.UserWhereInput;
};
export type UserNullableScalarRelationFilter = {
    is?: Prisma.UserWhereInput | null;
    isNot?: Prisma.UserWhereInput | null;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type UserCreateNestedOneWithoutCarsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutCarsInput, Prisma.UserUncheckedCreateWithoutCarsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutCarsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutCarsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutCarsInput, Prisma.UserUncheckedCreateWithoutCarsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutCarsInput;
    upsert?: Prisma.UserUpsertWithoutCarsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutCarsInput, Prisma.UserUpdateWithoutCarsInput>, Prisma.UserUncheckedUpdateWithoutCarsInput>;
};
export type UserCreateNestedOneWithoutBookingsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutBookingsInput, Prisma.UserUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutBookingsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutBookingsInput, Prisma.UserUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutBookingsInput;
    upsert?: Prisma.UserUpsertWithoutBookingsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutBookingsInput, Prisma.UserUpdateWithoutBookingsInput>, Prisma.UserUncheckedUpdateWithoutBookingsInput>;
};
export type UserCreateNestedOneWithoutReviewsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutReviewsInput, Prisma.UserUncheckedCreateWithoutReviewsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutReviewsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutReviewsInput, Prisma.UserUncheckedCreateWithoutReviewsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutReviewsInput;
    upsert?: Prisma.UserUpsertWithoutReviewsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutReviewsInput, Prisma.UserUpdateWithoutReviewsInput>, Prisma.UserUncheckedUpdateWithoutReviewsInput>;
};
export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutNotificationsInput, Prisma.UserUncheckedCreateWithoutNotificationsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutNotificationsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutNotificationsInput, Prisma.UserUncheckedCreateWithoutNotificationsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutNotificationsInput;
    upsert?: Prisma.UserUpsertWithoutNotificationsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutNotificationsInput, Prisma.UserUpdateWithoutNotificationsInput>, Prisma.UserUncheckedUpdateWithoutNotificationsInput>;
};
export type UserCreateNestedOneWithoutActivityLogsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutActivityLogsInput, Prisma.UserUncheckedCreateWithoutActivityLogsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutActivityLogsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneWithoutActivityLogsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutActivityLogsInput, Prisma.UserUncheckedCreateWithoutActivityLogsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutActivityLogsInput;
    upsert?: Prisma.UserUpsertWithoutActivityLogsInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutActivityLogsInput, Prisma.UserUpdateWithoutActivityLogsInput>, Prisma.UserUncheckedUpdateWithoutActivityLogsInput>;
};
export type UserCreateNestedOneWithoutRefreshSessionsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRefreshSessionsInput, Prisma.UserUncheckedCreateWithoutRefreshSessionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRefreshSessionsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutRefreshSessionsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRefreshSessionsInput, Prisma.UserUncheckedCreateWithoutRefreshSessionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRefreshSessionsInput;
    upsert?: Prisma.UserUpsertWithoutRefreshSessionsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutRefreshSessionsInput, Prisma.UserUpdateWithoutRefreshSessionsInput>, Prisma.UserUncheckedUpdateWithoutRefreshSessionsInput>;
};
export type UserCreateWithoutCarsInput = {
    id?: string;
    name: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    drivingLicense?: string | null;
    role?: $Enums.UserRole;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    bookings?: Prisma.BookingCreateNestedManyWithoutRenterInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutRenterInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    activityLogs?: Prisma.ActivityLogCreateNestedManyWithoutUserInput;
    refreshSessions?: Prisma.RefreshSessionCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutCarsInput = {
    id?: string;
    name: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    drivingLicense?: string | null;
    role?: $Enums.UserRole;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutRenterInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutRenterInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    activityLogs?: Prisma.ActivityLogUncheckedCreateNestedManyWithoutUserInput;
    refreshSessions?: Prisma.RefreshSessionUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutCarsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutCarsInput, Prisma.UserUncheckedCreateWithoutCarsInput>;
};
export type UserUpsertWithoutCarsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutCarsInput, Prisma.UserUncheckedUpdateWithoutCarsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutCarsInput, Prisma.UserUncheckedCreateWithoutCarsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutCarsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutCarsInput, Prisma.UserUncheckedUpdateWithoutCarsInput>;
};
export type UserUpdateWithoutCarsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    drivingLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bookings?: Prisma.BookingUpdateManyWithoutRenterNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutRenterNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    activityLogs?: Prisma.ActivityLogUpdateManyWithoutUserNestedInput;
    refreshSessions?: Prisma.RefreshSessionUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutCarsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    drivingLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutRenterNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutRenterNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    activityLogs?: Prisma.ActivityLogUncheckedUpdateManyWithoutUserNestedInput;
    refreshSessions?: Prisma.RefreshSessionUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutBookingsInput = {
    id?: string;
    name: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    drivingLicense?: string | null;
    role?: $Enums.UserRole;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    cars?: Prisma.CarCreateNestedManyWithoutOwnerInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutRenterInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    activityLogs?: Prisma.ActivityLogCreateNestedManyWithoutUserInput;
    refreshSessions?: Prisma.RefreshSessionCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutBookingsInput = {
    id?: string;
    name: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    drivingLicense?: string | null;
    role?: $Enums.UserRole;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    cars?: Prisma.CarUncheckedCreateNestedManyWithoutOwnerInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutRenterInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    activityLogs?: Prisma.ActivityLogUncheckedCreateNestedManyWithoutUserInput;
    refreshSessions?: Prisma.RefreshSessionUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutBookingsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutBookingsInput, Prisma.UserUncheckedCreateWithoutBookingsInput>;
};
export type UserUpsertWithoutBookingsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutBookingsInput, Prisma.UserUncheckedUpdateWithoutBookingsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutBookingsInput, Prisma.UserUncheckedCreateWithoutBookingsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutBookingsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutBookingsInput, Prisma.UserUncheckedUpdateWithoutBookingsInput>;
};
export type UserUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    drivingLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cars?: Prisma.CarUpdateManyWithoutOwnerNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutRenterNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    activityLogs?: Prisma.ActivityLogUpdateManyWithoutUserNestedInput;
    refreshSessions?: Prisma.RefreshSessionUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    drivingLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cars?: Prisma.CarUncheckedUpdateManyWithoutOwnerNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutRenterNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    activityLogs?: Prisma.ActivityLogUncheckedUpdateManyWithoutUserNestedInput;
    refreshSessions?: Prisma.RefreshSessionUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutReviewsInput = {
    id?: string;
    name: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    drivingLicense?: string | null;
    role?: $Enums.UserRole;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    cars?: Prisma.CarCreateNestedManyWithoutOwnerInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutRenterInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    activityLogs?: Prisma.ActivityLogCreateNestedManyWithoutUserInput;
    refreshSessions?: Prisma.RefreshSessionCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutReviewsInput = {
    id?: string;
    name: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    drivingLicense?: string | null;
    role?: $Enums.UserRole;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    cars?: Prisma.CarUncheckedCreateNestedManyWithoutOwnerInput;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutRenterInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    activityLogs?: Prisma.ActivityLogUncheckedCreateNestedManyWithoutUserInput;
    refreshSessions?: Prisma.RefreshSessionUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutReviewsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutReviewsInput, Prisma.UserUncheckedCreateWithoutReviewsInput>;
};
export type UserUpsertWithoutReviewsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutReviewsInput, Prisma.UserUncheckedUpdateWithoutReviewsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutReviewsInput, Prisma.UserUncheckedCreateWithoutReviewsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutReviewsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutReviewsInput, Prisma.UserUncheckedUpdateWithoutReviewsInput>;
};
export type UserUpdateWithoutReviewsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    drivingLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cars?: Prisma.CarUpdateManyWithoutOwnerNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutRenterNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    activityLogs?: Prisma.ActivityLogUpdateManyWithoutUserNestedInput;
    refreshSessions?: Prisma.RefreshSessionUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutReviewsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    drivingLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cars?: Prisma.CarUncheckedUpdateManyWithoutOwnerNestedInput;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutRenterNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    activityLogs?: Prisma.ActivityLogUncheckedUpdateManyWithoutUserNestedInput;
    refreshSessions?: Prisma.RefreshSessionUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutNotificationsInput = {
    id?: string;
    name: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    drivingLicense?: string | null;
    role?: $Enums.UserRole;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    cars?: Prisma.CarCreateNestedManyWithoutOwnerInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutRenterInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutRenterInput;
    activityLogs?: Prisma.ActivityLogCreateNestedManyWithoutUserInput;
    refreshSessions?: Prisma.RefreshSessionCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: string;
    name: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    drivingLicense?: string | null;
    role?: $Enums.UserRole;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    cars?: Prisma.CarUncheckedCreateNestedManyWithoutOwnerInput;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutRenterInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutRenterInput;
    activityLogs?: Prisma.ActivityLogUncheckedCreateNestedManyWithoutUserInput;
    refreshSessions?: Prisma.RefreshSessionUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutNotificationsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutNotificationsInput, Prisma.UserUncheckedCreateWithoutNotificationsInput>;
};
export type UserUpsertWithoutNotificationsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutNotificationsInput, Prisma.UserUncheckedUpdateWithoutNotificationsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutNotificationsInput, Prisma.UserUncheckedCreateWithoutNotificationsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutNotificationsInput, Prisma.UserUncheckedUpdateWithoutNotificationsInput>;
};
export type UserUpdateWithoutNotificationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    drivingLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cars?: Prisma.CarUpdateManyWithoutOwnerNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutRenterNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutRenterNestedInput;
    activityLogs?: Prisma.ActivityLogUpdateManyWithoutUserNestedInput;
    refreshSessions?: Prisma.RefreshSessionUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    drivingLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cars?: Prisma.CarUncheckedUpdateManyWithoutOwnerNestedInput;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutRenterNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutRenterNestedInput;
    activityLogs?: Prisma.ActivityLogUncheckedUpdateManyWithoutUserNestedInput;
    refreshSessions?: Prisma.RefreshSessionUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutActivityLogsInput = {
    id?: string;
    name: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    drivingLicense?: string | null;
    role?: $Enums.UserRole;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    cars?: Prisma.CarCreateNestedManyWithoutOwnerInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutRenterInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutRenterInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    refreshSessions?: Prisma.RefreshSessionCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutActivityLogsInput = {
    id?: string;
    name: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    drivingLicense?: string | null;
    role?: $Enums.UserRole;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    cars?: Prisma.CarUncheckedCreateNestedManyWithoutOwnerInput;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutRenterInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutRenterInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    refreshSessions?: Prisma.RefreshSessionUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutActivityLogsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutActivityLogsInput, Prisma.UserUncheckedCreateWithoutActivityLogsInput>;
};
export type UserUpsertWithoutActivityLogsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutActivityLogsInput, Prisma.UserUncheckedUpdateWithoutActivityLogsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutActivityLogsInput, Prisma.UserUncheckedCreateWithoutActivityLogsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutActivityLogsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutActivityLogsInput, Prisma.UserUncheckedUpdateWithoutActivityLogsInput>;
};
export type UserUpdateWithoutActivityLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    drivingLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cars?: Prisma.CarUpdateManyWithoutOwnerNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutRenterNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutRenterNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    refreshSessions?: Prisma.RefreshSessionUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutActivityLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    drivingLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cars?: Prisma.CarUncheckedUpdateManyWithoutOwnerNestedInput;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutRenterNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutRenterNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    refreshSessions?: Prisma.RefreshSessionUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutRefreshSessionsInput = {
    id?: string;
    name: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    drivingLicense?: string | null;
    role?: $Enums.UserRole;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    cars?: Prisma.CarCreateNestedManyWithoutOwnerInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutRenterInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutRenterInput;
    notifications?: Prisma.NotificationCreateNestedManyWithoutUserInput;
    activityLogs?: Prisma.ActivityLogCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutRefreshSessionsInput = {
    id?: string;
    name: string;
    email: string;
    phone?: string | null;
    passwordHash: string;
    drivingLicense?: string | null;
    role?: $Enums.UserRole;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    cars?: Prisma.CarUncheckedCreateNestedManyWithoutOwnerInput;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutRenterInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutRenterInput;
    notifications?: Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput;
    activityLogs?: Prisma.ActivityLogUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutRefreshSessionsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutRefreshSessionsInput, Prisma.UserUncheckedCreateWithoutRefreshSessionsInput>;
};
export type UserUpsertWithoutRefreshSessionsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutRefreshSessionsInput, Prisma.UserUncheckedUpdateWithoutRefreshSessionsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutRefreshSessionsInput, Prisma.UserUncheckedCreateWithoutRefreshSessionsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutRefreshSessionsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutRefreshSessionsInput, Prisma.UserUncheckedUpdateWithoutRefreshSessionsInput>;
};
export type UserUpdateWithoutRefreshSessionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    drivingLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cars?: Prisma.CarUpdateManyWithoutOwnerNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutRenterNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutRenterNestedInput;
    notifications?: Prisma.NotificationUpdateManyWithoutUserNestedInput;
    activityLogs?: Prisma.ActivityLogUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutRefreshSessionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    drivingLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    cars?: Prisma.CarUncheckedUpdateManyWithoutOwnerNestedInput;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutRenterNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutRenterNestedInput;
    notifications?: Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput;
    activityLogs?: Prisma.ActivityLogUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCountOutputType = {
    cars: number;
    bookings: number;
    reviews: number;
    notifications: number;
    activityLogs: number;
    refreshSessions: number;
};
export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    cars?: boolean | UserCountOutputTypeCountCarsArgs;
    bookings?: boolean | UserCountOutputTypeCountBookingsArgs;
    reviews?: boolean | UserCountOutputTypeCountReviewsArgs;
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs;
    activityLogs?: boolean | UserCountOutputTypeCountActivityLogsArgs;
    refreshSessions?: boolean | UserCountOutputTypeCountRefreshSessionsArgs;
};
export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserCountOutputTypeSelect<ExtArgs> | null;
};
export type UserCountOutputTypeCountCarsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CarWhereInput;
};
export type UserCountOutputTypeCountBookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingWhereInput;
};
export type UserCountOutputTypeCountReviewsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReviewWhereInput;
};
export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotificationWhereInput;
};
export type UserCountOutputTypeCountActivityLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ActivityLogWhereInput;
};
export type UserCountOutputTypeCountRefreshSessionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RefreshSessionWhereInput;
};
export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    email?: boolean;
    phone?: boolean;
    passwordHash?: boolean;
    drivingLicense?: boolean;
    role?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    cars?: boolean | Prisma.User$carsArgs<ExtArgs>;
    bookings?: boolean | Prisma.User$bookingsArgs<ExtArgs>;
    reviews?: boolean | Prisma.User$reviewsArgs<ExtArgs>;
    notifications?: boolean | Prisma.User$notificationsArgs<ExtArgs>;
    activityLogs?: boolean | Prisma.User$activityLogsArgs<ExtArgs>;
    refreshSessions?: boolean | Prisma.User$refreshSessionsArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    email?: boolean;
    phone?: boolean;
    passwordHash?: boolean;
    drivingLicense?: boolean;
    role?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    email?: boolean;
    phone?: boolean;
    passwordHash?: boolean;
    drivingLicense?: boolean;
    role?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectScalar = {
    id?: boolean;
    name?: boolean;
    email?: boolean;
    phone?: boolean;
    passwordHash?: boolean;
    drivingLicense?: boolean;
    role?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "email" | "phone" | "passwordHash" | "drivingLicense" | "role" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>;
export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    cars?: boolean | Prisma.User$carsArgs<ExtArgs>;
    bookings?: boolean | Prisma.User$bookingsArgs<ExtArgs>;
    reviews?: boolean | Prisma.User$reviewsArgs<ExtArgs>;
    notifications?: boolean | Prisma.User$notificationsArgs<ExtArgs>;
    activityLogs?: boolean | Prisma.User$activityLogsArgs<ExtArgs>;
    refreshSessions?: boolean | Prisma.User$refreshSessionsArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
};
export type UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User";
    objects: {
        cars: Prisma.$CarPayload<ExtArgs>[];
        bookings: Prisma.$BookingPayload<ExtArgs>[];
        reviews: Prisma.$ReviewPayload<ExtArgs>[];
        notifications: Prisma.$NotificationPayload<ExtArgs>[];
        activityLogs: Prisma.$ActivityLogPayload<ExtArgs>[];
        refreshSessions: Prisma.$RefreshSessionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        passwordHash: string;
        drivingLicense: string | null;
        role: $Enums.UserRole;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["user"]>;
    composites: {};
};
export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;
export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
};
export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['User'];
        meta: {
            name: 'User';
        };
    };
    findUnique<T extends UserFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserFindManyArgs>(args?: Prisma.SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserCreateArgs>(args: Prisma.SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserCreateManyArgs>(args?: Prisma.SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserDeleteArgs>(args: Prisma.SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserUpdateArgs>(args: Prisma.SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserUpdateManyArgs>(args: Prisma.SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserUpsertArgs>(args: Prisma.SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserCountArgs>(args?: Prisma.Subset<T, UserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserGroupByArgs['orderBy'];
    } : {
        orderBy?: UserGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserFieldRefs;
}
export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    cars<T extends Prisma.User$carsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$carsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CarPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    bookings<T extends Prisma.User$bookingsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    reviews<T extends Prisma.User$reviewsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    notifications<T extends Prisma.User$notificationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    activityLogs<T extends Prisma.User$activityLogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$activityLogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    refreshSessions<T extends Prisma.User$refreshSessionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$refreshSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RefreshSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserFieldRefs {
    readonly id: Prisma.FieldRef<"User", 'String'>;
    readonly name: Prisma.FieldRef<"User", 'String'>;
    readonly email: Prisma.FieldRef<"User", 'String'>;
    readonly phone: Prisma.FieldRef<"User", 'String'>;
    readonly passwordHash: Prisma.FieldRef<"User", 'String'>;
    readonly drivingLicense: Prisma.FieldRef<"User", 'String'>;
    readonly role: Prisma.FieldRef<"User", 'UserRole'>;
    readonly isActive: Prisma.FieldRef<"User", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"User", 'DateTime'>;
}
export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
};
export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
    where: Prisma.UserWhereUniqueInput;
};
export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
};
export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type User$carsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CarSelect<ExtArgs> | null;
    omit?: Prisma.CarOmit<ExtArgs> | null;
    include?: Prisma.CarInclude<ExtArgs> | null;
    where?: Prisma.CarWhereInput;
    orderBy?: Prisma.CarOrderByWithRelationInput | Prisma.CarOrderByWithRelationInput[];
    cursor?: Prisma.CarWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CarScalarFieldEnum | Prisma.CarScalarFieldEnum[];
};
export type User$bookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    where?: Prisma.BookingWhereInput;
    orderBy?: Prisma.BookingOrderByWithRelationInput | Prisma.BookingOrderByWithRelationInput[];
    cursor?: Prisma.BookingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BookingScalarFieldEnum | Prisma.BookingScalarFieldEnum[];
};
export type User$reviewsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReviewSelect<ExtArgs> | null;
    omit?: Prisma.ReviewOmit<ExtArgs> | null;
    include?: Prisma.ReviewInclude<ExtArgs> | null;
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithRelationInput | Prisma.ReviewOrderByWithRelationInput[];
    cursor?: Prisma.ReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReviewScalarFieldEnum | Prisma.ReviewScalarFieldEnum[];
};
export type User$notificationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.NotificationSelect<ExtArgs> | null;
    omit?: Prisma.NotificationOmit<ExtArgs> | null;
    include?: Prisma.NotificationInclude<ExtArgs> | null;
    where?: Prisma.NotificationWhereInput;
    orderBy?: Prisma.NotificationOrderByWithRelationInput | Prisma.NotificationOrderByWithRelationInput[];
    cursor?: Prisma.NotificationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotificationScalarFieldEnum | Prisma.NotificationScalarFieldEnum[];
};
export type User$activityLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ActivityLogSelect<ExtArgs> | null;
    omit?: Prisma.ActivityLogOmit<ExtArgs> | null;
    include?: Prisma.ActivityLogInclude<ExtArgs> | null;
    where?: Prisma.ActivityLogWhereInput;
    orderBy?: Prisma.ActivityLogOrderByWithRelationInput | Prisma.ActivityLogOrderByWithRelationInput[];
    cursor?: Prisma.ActivityLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ActivityLogScalarFieldEnum | Prisma.ActivityLogScalarFieldEnum[];
};
export type User$refreshSessionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefreshSessionSelect<ExtArgs> | null;
    omit?: Prisma.RefreshSessionOmit<ExtArgs> | null;
    include?: Prisma.RefreshSessionInclude<ExtArgs> | null;
    where?: Prisma.RefreshSessionWhereInput;
    orderBy?: Prisma.RefreshSessionOrderByWithRelationInput | Prisma.RefreshSessionOrderByWithRelationInput[];
    cursor?: Prisma.RefreshSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RefreshSessionScalarFieldEnum | Prisma.RefreshSessionScalarFieldEnum[];
};
export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
};
