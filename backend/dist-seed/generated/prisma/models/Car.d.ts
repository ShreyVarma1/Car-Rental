import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CarModel = runtime.Types.Result.DefaultSelection<Prisma.$CarPayload>;
export type AggregateCar = {
    _count: CarCountAggregateOutputType | null;
    _avg: CarAvgAggregateOutputType | null;
    _sum: CarSumAggregateOutputType | null;
    _min: CarMinAggregateOutputType | null;
    _max: CarMaxAggregateOutputType | null;
};
export type CarAvgAggregateOutputType = {
    year: number | null;
    seats: number | null;
    pricePerDay: runtime.Decimal | null;
};
export type CarSumAggregateOutputType = {
    year: number | null;
    seats: number | null;
    pricePerDay: runtime.Decimal | null;
};
export type CarMinAggregateOutputType = {
    id: string | null;
    ownerId: string | null;
    make: string | null;
    model: string | null;
    year: number | null;
    type: $Enums.CarType | null;
    transmission: $Enums.Transmission | null;
    fuel: $Enums.FuelType | null;
    seats: number | null;
    city: string | null;
    pricePerDay: runtime.Decimal | null;
    status: $Enums.CarStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CarMaxAggregateOutputType = {
    id: string | null;
    ownerId: string | null;
    make: string | null;
    model: string | null;
    year: number | null;
    type: $Enums.CarType | null;
    transmission: $Enums.Transmission | null;
    fuel: $Enums.FuelType | null;
    seats: number | null;
    city: string | null;
    pricePerDay: runtime.Decimal | null;
    status: $Enums.CarStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CarCountAggregateOutputType = {
    id: number;
    ownerId: number;
    make: number;
    model: number;
    year: number;
    type: number;
    transmission: number;
    fuel: number;
    seats: number;
    city: number;
    pricePerDay: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CarAvgAggregateInputType = {
    year?: true;
    seats?: true;
    pricePerDay?: true;
};
export type CarSumAggregateInputType = {
    year?: true;
    seats?: true;
    pricePerDay?: true;
};
export type CarMinAggregateInputType = {
    id?: true;
    ownerId?: true;
    make?: true;
    model?: true;
    year?: true;
    type?: true;
    transmission?: true;
    fuel?: true;
    seats?: true;
    city?: true;
    pricePerDay?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CarMaxAggregateInputType = {
    id?: true;
    ownerId?: true;
    make?: true;
    model?: true;
    year?: true;
    type?: true;
    transmission?: true;
    fuel?: true;
    seats?: true;
    city?: true;
    pricePerDay?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CarCountAggregateInputType = {
    id?: true;
    ownerId?: true;
    make?: true;
    model?: true;
    year?: true;
    type?: true;
    transmission?: true;
    fuel?: true;
    seats?: true;
    city?: true;
    pricePerDay?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CarAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CarWhereInput;
    orderBy?: Prisma.CarOrderByWithRelationInput | Prisma.CarOrderByWithRelationInput[];
    cursor?: Prisma.CarWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CarCountAggregateInputType;
    _avg?: CarAvgAggregateInputType;
    _sum?: CarSumAggregateInputType;
    _min?: CarMinAggregateInputType;
    _max?: CarMaxAggregateInputType;
};
export type GetCarAggregateType<T extends CarAggregateArgs> = {
    [P in keyof T & keyof AggregateCar]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCar[P]> : Prisma.GetScalarType<T[P], AggregateCar[P]>;
};
export type CarGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CarWhereInput;
    orderBy?: Prisma.CarOrderByWithAggregationInput | Prisma.CarOrderByWithAggregationInput[];
    by: Prisma.CarScalarFieldEnum[] | Prisma.CarScalarFieldEnum;
    having?: Prisma.CarScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CarCountAggregateInputType | true;
    _avg?: CarAvgAggregateInputType;
    _sum?: CarSumAggregateInputType;
    _min?: CarMinAggregateInputType;
    _max?: CarMaxAggregateInputType;
};
export type CarGroupByOutputType = {
    id: string;
    ownerId: string;
    make: string;
    model: string;
    year: number;
    type: $Enums.CarType;
    transmission: $Enums.Transmission;
    fuel: $Enums.FuelType;
    seats: number;
    city: string;
    pricePerDay: runtime.Decimal;
    status: $Enums.CarStatus;
    createdAt: Date;
    updatedAt: Date;
    _count: CarCountAggregateOutputType | null;
    _avg: CarAvgAggregateOutputType | null;
    _sum: CarSumAggregateOutputType | null;
    _min: CarMinAggregateOutputType | null;
    _max: CarMaxAggregateOutputType | null;
};
export type GetCarGroupByPayload<T extends CarGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CarGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CarGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CarGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CarGroupByOutputType[P]>;
}>>;
export type CarWhereInput = {
    AND?: Prisma.CarWhereInput | Prisma.CarWhereInput[];
    OR?: Prisma.CarWhereInput[];
    NOT?: Prisma.CarWhereInput | Prisma.CarWhereInput[];
    id?: Prisma.StringFilter<"Car"> | string;
    ownerId?: Prisma.StringFilter<"Car"> | string;
    make?: Prisma.StringFilter<"Car"> | string;
    model?: Prisma.StringFilter<"Car"> | string;
    year?: Prisma.IntFilter<"Car"> | number;
    type?: Prisma.EnumCarTypeFilter<"Car"> | $Enums.CarType;
    transmission?: Prisma.EnumTransmissionFilter<"Car"> | $Enums.Transmission;
    fuel?: Prisma.EnumFuelTypeFilter<"Car"> | $Enums.FuelType;
    seats?: Prisma.IntFilter<"Car"> | number;
    city?: Prisma.StringFilter<"Car"> | string;
    pricePerDay?: Prisma.DecimalFilter<"Car"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumCarStatusFilter<"Car"> | $Enums.CarStatus;
    createdAt?: Prisma.DateTimeFilter<"Car"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Car"> | Date | string;
    owner?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    bookings?: Prisma.BookingListRelationFilter;
    reviews?: Prisma.ReviewListRelationFilter;
};
export type CarOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
    make?: Prisma.SortOrder;
    model?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    transmission?: Prisma.SortOrder;
    fuel?: Prisma.SortOrder;
    seats?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    pricePerDay?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    owner?: Prisma.UserOrderByWithRelationInput;
    bookings?: Prisma.BookingOrderByRelationAggregateInput;
    reviews?: Prisma.ReviewOrderByRelationAggregateInput;
};
export type CarWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CarWhereInput | Prisma.CarWhereInput[];
    OR?: Prisma.CarWhereInput[];
    NOT?: Prisma.CarWhereInput | Prisma.CarWhereInput[];
    ownerId?: Prisma.StringFilter<"Car"> | string;
    make?: Prisma.StringFilter<"Car"> | string;
    model?: Prisma.StringFilter<"Car"> | string;
    year?: Prisma.IntFilter<"Car"> | number;
    type?: Prisma.EnumCarTypeFilter<"Car"> | $Enums.CarType;
    transmission?: Prisma.EnumTransmissionFilter<"Car"> | $Enums.Transmission;
    fuel?: Prisma.EnumFuelTypeFilter<"Car"> | $Enums.FuelType;
    seats?: Prisma.IntFilter<"Car"> | number;
    city?: Prisma.StringFilter<"Car"> | string;
    pricePerDay?: Prisma.DecimalFilter<"Car"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumCarStatusFilter<"Car"> | $Enums.CarStatus;
    createdAt?: Prisma.DateTimeFilter<"Car"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Car"> | Date | string;
    owner?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    bookings?: Prisma.BookingListRelationFilter;
    reviews?: Prisma.ReviewListRelationFilter;
}, "id">;
export type CarOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
    make?: Prisma.SortOrder;
    model?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    transmission?: Prisma.SortOrder;
    fuel?: Prisma.SortOrder;
    seats?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    pricePerDay?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CarCountOrderByAggregateInput;
    _avg?: Prisma.CarAvgOrderByAggregateInput;
    _max?: Prisma.CarMaxOrderByAggregateInput;
    _min?: Prisma.CarMinOrderByAggregateInput;
    _sum?: Prisma.CarSumOrderByAggregateInput;
};
export type CarScalarWhereWithAggregatesInput = {
    AND?: Prisma.CarScalarWhereWithAggregatesInput | Prisma.CarScalarWhereWithAggregatesInput[];
    OR?: Prisma.CarScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CarScalarWhereWithAggregatesInput | Prisma.CarScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Car"> | string;
    ownerId?: Prisma.StringWithAggregatesFilter<"Car"> | string;
    make?: Prisma.StringWithAggregatesFilter<"Car"> | string;
    model?: Prisma.StringWithAggregatesFilter<"Car"> | string;
    year?: Prisma.IntWithAggregatesFilter<"Car"> | number;
    type?: Prisma.EnumCarTypeWithAggregatesFilter<"Car"> | $Enums.CarType;
    transmission?: Prisma.EnumTransmissionWithAggregatesFilter<"Car"> | $Enums.Transmission;
    fuel?: Prisma.EnumFuelTypeWithAggregatesFilter<"Car"> | $Enums.FuelType;
    seats?: Prisma.IntWithAggregatesFilter<"Car"> | number;
    city?: Prisma.StringWithAggregatesFilter<"Car"> | string;
    pricePerDay?: Prisma.DecimalWithAggregatesFilter<"Car"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumCarStatusWithAggregatesFilter<"Car"> | $Enums.CarStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Car"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Car"> | Date | string;
};
export type CarCreateInput = {
    id?: string;
    make: string;
    model: string;
    year: number;
    type: $Enums.CarType;
    transmission: $Enums.Transmission;
    fuel: $Enums.FuelType;
    seats: number;
    city: string;
    pricePerDay: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.CarStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    owner: Prisma.UserCreateNestedOneWithoutCarsInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutCarInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutCarInput;
};
export type CarUncheckedCreateInput = {
    id?: string;
    ownerId: string;
    make: string;
    model: string;
    year: number;
    type: $Enums.CarType;
    transmission: $Enums.Transmission;
    fuel: $Enums.FuelType;
    seats: number;
    city: string;
    pricePerDay: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.CarStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutCarInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutCarInput;
};
export type CarUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    make?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumCarTypeFieldUpdateOperationsInput | $Enums.CarType;
    transmission?: Prisma.EnumTransmissionFieldUpdateOperationsInput | $Enums.Transmission;
    fuel?: Prisma.EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType;
    seats?: Prisma.IntFieldUpdateOperationsInput | number;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    pricePerDay?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumCarStatusFieldUpdateOperationsInput | $Enums.CarStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    owner?: Prisma.UserUpdateOneRequiredWithoutCarsNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutCarNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutCarNestedInput;
};
export type CarUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerId?: Prisma.StringFieldUpdateOperationsInput | string;
    make?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumCarTypeFieldUpdateOperationsInput | $Enums.CarType;
    transmission?: Prisma.EnumTransmissionFieldUpdateOperationsInput | $Enums.Transmission;
    fuel?: Prisma.EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType;
    seats?: Prisma.IntFieldUpdateOperationsInput | number;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    pricePerDay?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumCarStatusFieldUpdateOperationsInput | $Enums.CarStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutCarNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutCarNestedInput;
};
export type CarCreateManyInput = {
    id?: string;
    ownerId: string;
    make: string;
    model: string;
    year: number;
    type: $Enums.CarType;
    transmission: $Enums.Transmission;
    fuel: $Enums.FuelType;
    seats: number;
    city: string;
    pricePerDay: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.CarStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CarUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    make?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumCarTypeFieldUpdateOperationsInput | $Enums.CarType;
    transmission?: Prisma.EnumTransmissionFieldUpdateOperationsInput | $Enums.Transmission;
    fuel?: Prisma.EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType;
    seats?: Prisma.IntFieldUpdateOperationsInput | number;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    pricePerDay?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumCarStatusFieldUpdateOperationsInput | $Enums.CarStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CarUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerId?: Prisma.StringFieldUpdateOperationsInput | string;
    make?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumCarTypeFieldUpdateOperationsInput | $Enums.CarType;
    transmission?: Prisma.EnumTransmissionFieldUpdateOperationsInput | $Enums.Transmission;
    fuel?: Prisma.EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType;
    seats?: Prisma.IntFieldUpdateOperationsInput | number;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    pricePerDay?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumCarStatusFieldUpdateOperationsInput | $Enums.CarStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CarListRelationFilter = {
    every?: Prisma.CarWhereInput;
    some?: Prisma.CarWhereInput;
    none?: Prisma.CarWhereInput;
};
export type CarOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CarCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
    make?: Prisma.SortOrder;
    model?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    transmission?: Prisma.SortOrder;
    fuel?: Prisma.SortOrder;
    seats?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    pricePerDay?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CarAvgOrderByAggregateInput = {
    year?: Prisma.SortOrder;
    seats?: Prisma.SortOrder;
    pricePerDay?: Prisma.SortOrder;
};
export type CarMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
    make?: Prisma.SortOrder;
    model?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    transmission?: Prisma.SortOrder;
    fuel?: Prisma.SortOrder;
    seats?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    pricePerDay?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CarMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
    make?: Prisma.SortOrder;
    model?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    transmission?: Prisma.SortOrder;
    fuel?: Prisma.SortOrder;
    seats?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    pricePerDay?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CarSumOrderByAggregateInput = {
    year?: Prisma.SortOrder;
    seats?: Prisma.SortOrder;
    pricePerDay?: Prisma.SortOrder;
};
export type CarScalarRelationFilter = {
    is?: Prisma.CarWhereInput;
    isNot?: Prisma.CarWhereInput;
};
export type CarCreateNestedManyWithoutOwnerInput = {
    create?: Prisma.XOR<Prisma.CarCreateWithoutOwnerInput, Prisma.CarUncheckedCreateWithoutOwnerInput> | Prisma.CarCreateWithoutOwnerInput[] | Prisma.CarUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: Prisma.CarCreateOrConnectWithoutOwnerInput | Prisma.CarCreateOrConnectWithoutOwnerInput[];
    createMany?: Prisma.CarCreateManyOwnerInputEnvelope;
    connect?: Prisma.CarWhereUniqueInput | Prisma.CarWhereUniqueInput[];
};
export type CarUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: Prisma.XOR<Prisma.CarCreateWithoutOwnerInput, Prisma.CarUncheckedCreateWithoutOwnerInput> | Prisma.CarCreateWithoutOwnerInput[] | Prisma.CarUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: Prisma.CarCreateOrConnectWithoutOwnerInput | Prisma.CarCreateOrConnectWithoutOwnerInput[];
    createMany?: Prisma.CarCreateManyOwnerInputEnvelope;
    connect?: Prisma.CarWhereUniqueInput | Prisma.CarWhereUniqueInput[];
};
export type CarUpdateManyWithoutOwnerNestedInput = {
    create?: Prisma.XOR<Prisma.CarCreateWithoutOwnerInput, Prisma.CarUncheckedCreateWithoutOwnerInput> | Prisma.CarCreateWithoutOwnerInput[] | Prisma.CarUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: Prisma.CarCreateOrConnectWithoutOwnerInput | Prisma.CarCreateOrConnectWithoutOwnerInput[];
    upsert?: Prisma.CarUpsertWithWhereUniqueWithoutOwnerInput | Prisma.CarUpsertWithWhereUniqueWithoutOwnerInput[];
    createMany?: Prisma.CarCreateManyOwnerInputEnvelope;
    set?: Prisma.CarWhereUniqueInput | Prisma.CarWhereUniqueInput[];
    disconnect?: Prisma.CarWhereUniqueInput | Prisma.CarWhereUniqueInput[];
    delete?: Prisma.CarWhereUniqueInput | Prisma.CarWhereUniqueInput[];
    connect?: Prisma.CarWhereUniqueInput | Prisma.CarWhereUniqueInput[];
    update?: Prisma.CarUpdateWithWhereUniqueWithoutOwnerInput | Prisma.CarUpdateWithWhereUniqueWithoutOwnerInput[];
    updateMany?: Prisma.CarUpdateManyWithWhereWithoutOwnerInput | Prisma.CarUpdateManyWithWhereWithoutOwnerInput[];
    deleteMany?: Prisma.CarScalarWhereInput | Prisma.CarScalarWhereInput[];
};
export type CarUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: Prisma.XOR<Prisma.CarCreateWithoutOwnerInput, Prisma.CarUncheckedCreateWithoutOwnerInput> | Prisma.CarCreateWithoutOwnerInput[] | Prisma.CarUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: Prisma.CarCreateOrConnectWithoutOwnerInput | Prisma.CarCreateOrConnectWithoutOwnerInput[];
    upsert?: Prisma.CarUpsertWithWhereUniqueWithoutOwnerInput | Prisma.CarUpsertWithWhereUniqueWithoutOwnerInput[];
    createMany?: Prisma.CarCreateManyOwnerInputEnvelope;
    set?: Prisma.CarWhereUniqueInput | Prisma.CarWhereUniqueInput[];
    disconnect?: Prisma.CarWhereUniqueInput | Prisma.CarWhereUniqueInput[];
    delete?: Prisma.CarWhereUniqueInput | Prisma.CarWhereUniqueInput[];
    connect?: Prisma.CarWhereUniqueInput | Prisma.CarWhereUniqueInput[];
    update?: Prisma.CarUpdateWithWhereUniqueWithoutOwnerInput | Prisma.CarUpdateWithWhereUniqueWithoutOwnerInput[];
    updateMany?: Prisma.CarUpdateManyWithWhereWithoutOwnerInput | Prisma.CarUpdateManyWithWhereWithoutOwnerInput[];
    deleteMany?: Prisma.CarScalarWhereInput | Prisma.CarScalarWhereInput[];
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type EnumCarTypeFieldUpdateOperationsInput = {
    set?: $Enums.CarType;
};
export type EnumTransmissionFieldUpdateOperationsInput = {
    set?: $Enums.Transmission;
};
export type EnumFuelTypeFieldUpdateOperationsInput = {
    set?: $Enums.FuelType;
};
export type DecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type EnumCarStatusFieldUpdateOperationsInput = {
    set?: $Enums.CarStatus;
};
export type CarCreateNestedOneWithoutBookingsInput = {
    create?: Prisma.XOR<Prisma.CarCreateWithoutBookingsInput, Prisma.CarUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.CarCreateOrConnectWithoutBookingsInput;
    connect?: Prisma.CarWhereUniqueInput;
};
export type CarUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: Prisma.XOR<Prisma.CarCreateWithoutBookingsInput, Prisma.CarUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.CarCreateOrConnectWithoutBookingsInput;
    upsert?: Prisma.CarUpsertWithoutBookingsInput;
    connect?: Prisma.CarWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CarUpdateToOneWithWhereWithoutBookingsInput, Prisma.CarUpdateWithoutBookingsInput>, Prisma.CarUncheckedUpdateWithoutBookingsInput>;
};
export type CarCreateNestedOneWithoutReviewsInput = {
    create?: Prisma.XOR<Prisma.CarCreateWithoutReviewsInput, Prisma.CarUncheckedCreateWithoutReviewsInput>;
    connectOrCreate?: Prisma.CarCreateOrConnectWithoutReviewsInput;
    connect?: Prisma.CarWhereUniqueInput;
};
export type CarUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: Prisma.XOR<Prisma.CarCreateWithoutReviewsInput, Prisma.CarUncheckedCreateWithoutReviewsInput>;
    connectOrCreate?: Prisma.CarCreateOrConnectWithoutReviewsInput;
    upsert?: Prisma.CarUpsertWithoutReviewsInput;
    connect?: Prisma.CarWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CarUpdateToOneWithWhereWithoutReviewsInput, Prisma.CarUpdateWithoutReviewsInput>, Prisma.CarUncheckedUpdateWithoutReviewsInput>;
};
export type CarCreateWithoutOwnerInput = {
    id?: string;
    make: string;
    model: string;
    year: number;
    type: $Enums.CarType;
    transmission: $Enums.Transmission;
    fuel: $Enums.FuelType;
    seats: number;
    city: string;
    pricePerDay: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.CarStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    bookings?: Prisma.BookingCreateNestedManyWithoutCarInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutCarInput;
};
export type CarUncheckedCreateWithoutOwnerInput = {
    id?: string;
    make: string;
    model: string;
    year: number;
    type: $Enums.CarType;
    transmission: $Enums.Transmission;
    fuel: $Enums.FuelType;
    seats: number;
    city: string;
    pricePerDay: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.CarStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutCarInput;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutCarInput;
};
export type CarCreateOrConnectWithoutOwnerInput = {
    where: Prisma.CarWhereUniqueInput;
    create: Prisma.XOR<Prisma.CarCreateWithoutOwnerInput, Prisma.CarUncheckedCreateWithoutOwnerInput>;
};
export type CarCreateManyOwnerInputEnvelope = {
    data: Prisma.CarCreateManyOwnerInput | Prisma.CarCreateManyOwnerInput[];
    skipDuplicates?: boolean;
};
export type CarUpsertWithWhereUniqueWithoutOwnerInput = {
    where: Prisma.CarWhereUniqueInput;
    update: Prisma.XOR<Prisma.CarUpdateWithoutOwnerInput, Prisma.CarUncheckedUpdateWithoutOwnerInput>;
    create: Prisma.XOR<Prisma.CarCreateWithoutOwnerInput, Prisma.CarUncheckedCreateWithoutOwnerInput>;
};
export type CarUpdateWithWhereUniqueWithoutOwnerInput = {
    where: Prisma.CarWhereUniqueInput;
    data: Prisma.XOR<Prisma.CarUpdateWithoutOwnerInput, Prisma.CarUncheckedUpdateWithoutOwnerInput>;
};
export type CarUpdateManyWithWhereWithoutOwnerInput = {
    where: Prisma.CarScalarWhereInput;
    data: Prisma.XOR<Prisma.CarUpdateManyMutationInput, Prisma.CarUncheckedUpdateManyWithoutOwnerInput>;
};
export type CarScalarWhereInput = {
    AND?: Prisma.CarScalarWhereInput | Prisma.CarScalarWhereInput[];
    OR?: Prisma.CarScalarWhereInput[];
    NOT?: Prisma.CarScalarWhereInput | Prisma.CarScalarWhereInput[];
    id?: Prisma.StringFilter<"Car"> | string;
    ownerId?: Prisma.StringFilter<"Car"> | string;
    make?: Prisma.StringFilter<"Car"> | string;
    model?: Prisma.StringFilter<"Car"> | string;
    year?: Prisma.IntFilter<"Car"> | number;
    type?: Prisma.EnumCarTypeFilter<"Car"> | $Enums.CarType;
    transmission?: Prisma.EnumTransmissionFilter<"Car"> | $Enums.Transmission;
    fuel?: Prisma.EnumFuelTypeFilter<"Car"> | $Enums.FuelType;
    seats?: Prisma.IntFilter<"Car"> | number;
    city?: Prisma.StringFilter<"Car"> | string;
    pricePerDay?: Prisma.DecimalFilter<"Car"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumCarStatusFilter<"Car"> | $Enums.CarStatus;
    createdAt?: Prisma.DateTimeFilter<"Car"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Car"> | Date | string;
};
export type CarCreateWithoutBookingsInput = {
    id?: string;
    make: string;
    model: string;
    year: number;
    type: $Enums.CarType;
    transmission: $Enums.Transmission;
    fuel: $Enums.FuelType;
    seats: number;
    city: string;
    pricePerDay: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.CarStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    owner: Prisma.UserCreateNestedOneWithoutCarsInput;
    reviews?: Prisma.ReviewCreateNestedManyWithoutCarInput;
};
export type CarUncheckedCreateWithoutBookingsInput = {
    id?: string;
    ownerId: string;
    make: string;
    model: string;
    year: number;
    type: $Enums.CarType;
    transmission: $Enums.Transmission;
    fuel: $Enums.FuelType;
    seats: number;
    city: string;
    pricePerDay: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.CarStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    reviews?: Prisma.ReviewUncheckedCreateNestedManyWithoutCarInput;
};
export type CarCreateOrConnectWithoutBookingsInput = {
    where: Prisma.CarWhereUniqueInput;
    create: Prisma.XOR<Prisma.CarCreateWithoutBookingsInput, Prisma.CarUncheckedCreateWithoutBookingsInput>;
};
export type CarUpsertWithoutBookingsInput = {
    update: Prisma.XOR<Prisma.CarUpdateWithoutBookingsInput, Prisma.CarUncheckedUpdateWithoutBookingsInput>;
    create: Prisma.XOR<Prisma.CarCreateWithoutBookingsInput, Prisma.CarUncheckedCreateWithoutBookingsInput>;
    where?: Prisma.CarWhereInput;
};
export type CarUpdateToOneWithWhereWithoutBookingsInput = {
    where?: Prisma.CarWhereInput;
    data: Prisma.XOR<Prisma.CarUpdateWithoutBookingsInput, Prisma.CarUncheckedUpdateWithoutBookingsInput>;
};
export type CarUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    make?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumCarTypeFieldUpdateOperationsInput | $Enums.CarType;
    transmission?: Prisma.EnumTransmissionFieldUpdateOperationsInput | $Enums.Transmission;
    fuel?: Prisma.EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType;
    seats?: Prisma.IntFieldUpdateOperationsInput | number;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    pricePerDay?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumCarStatusFieldUpdateOperationsInput | $Enums.CarStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    owner?: Prisma.UserUpdateOneRequiredWithoutCarsNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutCarNestedInput;
};
export type CarUncheckedUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerId?: Prisma.StringFieldUpdateOperationsInput | string;
    make?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumCarTypeFieldUpdateOperationsInput | $Enums.CarType;
    transmission?: Prisma.EnumTransmissionFieldUpdateOperationsInput | $Enums.Transmission;
    fuel?: Prisma.EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType;
    seats?: Prisma.IntFieldUpdateOperationsInput | number;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    pricePerDay?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumCarStatusFieldUpdateOperationsInput | $Enums.CarStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutCarNestedInput;
};
export type CarCreateWithoutReviewsInput = {
    id?: string;
    make: string;
    model: string;
    year: number;
    type: $Enums.CarType;
    transmission: $Enums.Transmission;
    fuel: $Enums.FuelType;
    seats: number;
    city: string;
    pricePerDay: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.CarStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    owner: Prisma.UserCreateNestedOneWithoutCarsInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutCarInput;
};
export type CarUncheckedCreateWithoutReviewsInput = {
    id?: string;
    ownerId: string;
    make: string;
    model: string;
    year: number;
    type: $Enums.CarType;
    transmission: $Enums.Transmission;
    fuel: $Enums.FuelType;
    seats: number;
    city: string;
    pricePerDay: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.CarStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutCarInput;
};
export type CarCreateOrConnectWithoutReviewsInput = {
    where: Prisma.CarWhereUniqueInput;
    create: Prisma.XOR<Prisma.CarCreateWithoutReviewsInput, Prisma.CarUncheckedCreateWithoutReviewsInput>;
};
export type CarUpsertWithoutReviewsInput = {
    update: Prisma.XOR<Prisma.CarUpdateWithoutReviewsInput, Prisma.CarUncheckedUpdateWithoutReviewsInput>;
    create: Prisma.XOR<Prisma.CarCreateWithoutReviewsInput, Prisma.CarUncheckedCreateWithoutReviewsInput>;
    where?: Prisma.CarWhereInput;
};
export type CarUpdateToOneWithWhereWithoutReviewsInput = {
    where?: Prisma.CarWhereInput;
    data: Prisma.XOR<Prisma.CarUpdateWithoutReviewsInput, Prisma.CarUncheckedUpdateWithoutReviewsInput>;
};
export type CarUpdateWithoutReviewsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    make?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumCarTypeFieldUpdateOperationsInput | $Enums.CarType;
    transmission?: Prisma.EnumTransmissionFieldUpdateOperationsInput | $Enums.Transmission;
    fuel?: Prisma.EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType;
    seats?: Prisma.IntFieldUpdateOperationsInput | number;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    pricePerDay?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumCarStatusFieldUpdateOperationsInput | $Enums.CarStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    owner?: Prisma.UserUpdateOneRequiredWithoutCarsNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutCarNestedInput;
};
export type CarUncheckedUpdateWithoutReviewsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerId?: Prisma.StringFieldUpdateOperationsInput | string;
    make?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumCarTypeFieldUpdateOperationsInput | $Enums.CarType;
    transmission?: Prisma.EnumTransmissionFieldUpdateOperationsInput | $Enums.Transmission;
    fuel?: Prisma.EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType;
    seats?: Prisma.IntFieldUpdateOperationsInput | number;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    pricePerDay?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumCarStatusFieldUpdateOperationsInput | $Enums.CarStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutCarNestedInput;
};
export type CarCreateManyOwnerInput = {
    id?: string;
    make: string;
    model: string;
    year: number;
    type: $Enums.CarType;
    transmission: $Enums.Transmission;
    fuel: $Enums.FuelType;
    seats: number;
    city: string;
    pricePerDay: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.CarStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CarUpdateWithoutOwnerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    make?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumCarTypeFieldUpdateOperationsInput | $Enums.CarType;
    transmission?: Prisma.EnumTransmissionFieldUpdateOperationsInput | $Enums.Transmission;
    fuel?: Prisma.EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType;
    seats?: Prisma.IntFieldUpdateOperationsInput | number;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    pricePerDay?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumCarStatusFieldUpdateOperationsInput | $Enums.CarStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bookings?: Prisma.BookingUpdateManyWithoutCarNestedInput;
    reviews?: Prisma.ReviewUpdateManyWithoutCarNestedInput;
};
export type CarUncheckedUpdateWithoutOwnerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    make?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumCarTypeFieldUpdateOperationsInput | $Enums.CarType;
    transmission?: Prisma.EnumTransmissionFieldUpdateOperationsInput | $Enums.Transmission;
    fuel?: Prisma.EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType;
    seats?: Prisma.IntFieldUpdateOperationsInput | number;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    pricePerDay?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumCarStatusFieldUpdateOperationsInput | $Enums.CarStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutCarNestedInput;
    reviews?: Prisma.ReviewUncheckedUpdateManyWithoutCarNestedInput;
};
export type CarUncheckedUpdateManyWithoutOwnerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    make?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumCarTypeFieldUpdateOperationsInput | $Enums.CarType;
    transmission?: Prisma.EnumTransmissionFieldUpdateOperationsInput | $Enums.Transmission;
    fuel?: Prisma.EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType;
    seats?: Prisma.IntFieldUpdateOperationsInput | number;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    pricePerDay?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumCarStatusFieldUpdateOperationsInput | $Enums.CarStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CarCountOutputType = {
    bookings: number;
    reviews: number;
};
export type CarCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bookings?: boolean | CarCountOutputTypeCountBookingsArgs;
    reviews?: boolean | CarCountOutputTypeCountReviewsArgs;
};
export type CarCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CarCountOutputTypeSelect<ExtArgs> | null;
};
export type CarCountOutputTypeCountBookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingWhereInput;
};
export type CarCountOutputTypeCountReviewsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReviewWhereInput;
};
export type CarSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    ownerId?: boolean;
    make?: boolean;
    model?: boolean;
    year?: boolean;
    type?: boolean;
    transmission?: boolean;
    fuel?: boolean;
    seats?: boolean;
    city?: boolean;
    pricePerDay?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    owner?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    bookings?: boolean | Prisma.Car$bookingsArgs<ExtArgs>;
    reviews?: boolean | Prisma.Car$reviewsArgs<ExtArgs>;
    _count?: boolean | Prisma.CarCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["car"]>;
export type CarSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    ownerId?: boolean;
    make?: boolean;
    model?: boolean;
    year?: boolean;
    type?: boolean;
    transmission?: boolean;
    fuel?: boolean;
    seats?: boolean;
    city?: boolean;
    pricePerDay?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    owner?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["car"]>;
export type CarSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    ownerId?: boolean;
    make?: boolean;
    model?: boolean;
    year?: boolean;
    type?: boolean;
    transmission?: boolean;
    fuel?: boolean;
    seats?: boolean;
    city?: boolean;
    pricePerDay?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    owner?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["car"]>;
export type CarSelectScalar = {
    id?: boolean;
    ownerId?: boolean;
    make?: boolean;
    model?: boolean;
    year?: boolean;
    type?: boolean;
    transmission?: boolean;
    fuel?: boolean;
    seats?: boolean;
    city?: boolean;
    pricePerDay?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CarOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "ownerId" | "make" | "model" | "year" | "type" | "transmission" | "fuel" | "seats" | "city" | "pricePerDay" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["car"]>;
export type CarInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    owner?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    bookings?: boolean | Prisma.Car$bookingsArgs<ExtArgs>;
    reviews?: boolean | Prisma.Car$reviewsArgs<ExtArgs>;
    _count?: boolean | Prisma.CarCountOutputTypeDefaultArgs<ExtArgs>;
};
export type CarIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    owner?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type CarIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    owner?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $CarPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Car";
    objects: {
        owner: Prisma.$UserPayload<ExtArgs>;
        bookings: Prisma.$BookingPayload<ExtArgs>[];
        reviews: Prisma.$ReviewPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        ownerId: string;
        make: string;
        model: string;
        year: number;
        type: $Enums.CarType;
        transmission: $Enums.Transmission;
        fuel: $Enums.FuelType;
        seats: number;
        city: string;
        pricePerDay: runtime.Decimal;
        status: $Enums.CarStatus;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["car"]>;
    composites: {};
};
export type CarGetPayload<S extends boolean | null | undefined | CarDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CarPayload, S>;
export type CarCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CarFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CarCountAggregateInputType | true;
};
export interface CarDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Car'];
        meta: {
            name: 'Car';
        };
    };
    findUnique<T extends CarFindUniqueArgs>(args: Prisma.SelectSubset<T, CarFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CarClient<runtime.Types.Result.GetResult<Prisma.$CarPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CarFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CarFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CarClient<runtime.Types.Result.GetResult<Prisma.$CarPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CarFindFirstArgs>(args?: Prisma.SelectSubset<T, CarFindFirstArgs<ExtArgs>>): Prisma.Prisma__CarClient<runtime.Types.Result.GetResult<Prisma.$CarPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CarFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CarFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CarClient<runtime.Types.Result.GetResult<Prisma.$CarPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CarFindManyArgs>(args?: Prisma.SelectSubset<T, CarFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CarPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CarCreateArgs>(args: Prisma.SelectSubset<T, CarCreateArgs<ExtArgs>>): Prisma.Prisma__CarClient<runtime.Types.Result.GetResult<Prisma.$CarPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CarCreateManyArgs>(args?: Prisma.SelectSubset<T, CarCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CarCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CarCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CarPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CarDeleteArgs>(args: Prisma.SelectSubset<T, CarDeleteArgs<ExtArgs>>): Prisma.Prisma__CarClient<runtime.Types.Result.GetResult<Prisma.$CarPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CarUpdateArgs>(args: Prisma.SelectSubset<T, CarUpdateArgs<ExtArgs>>): Prisma.Prisma__CarClient<runtime.Types.Result.GetResult<Prisma.$CarPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CarDeleteManyArgs>(args?: Prisma.SelectSubset<T, CarDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CarUpdateManyArgs>(args: Prisma.SelectSubset<T, CarUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CarUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CarUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CarPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CarUpsertArgs>(args: Prisma.SelectSubset<T, CarUpsertArgs<ExtArgs>>): Prisma.Prisma__CarClient<runtime.Types.Result.GetResult<Prisma.$CarPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CarCountArgs>(args?: Prisma.Subset<T, CarCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CarCountAggregateOutputType> : number>;
    aggregate<T extends CarAggregateArgs>(args: Prisma.Subset<T, CarAggregateArgs>): Prisma.PrismaPromise<GetCarAggregateType<T>>;
    groupBy<T extends CarGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CarGroupByArgs['orderBy'];
    } : {
        orderBy?: CarGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CarGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCarGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CarFieldRefs;
}
export interface Prisma__CarClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    owner<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    bookings<T extends Prisma.Car$bookingsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Car$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    reviews<T extends Prisma.Car$reviewsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Car$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CarFieldRefs {
    readonly id: Prisma.FieldRef<"Car", 'String'>;
    readonly ownerId: Prisma.FieldRef<"Car", 'String'>;
    readonly make: Prisma.FieldRef<"Car", 'String'>;
    readonly model: Prisma.FieldRef<"Car", 'String'>;
    readonly year: Prisma.FieldRef<"Car", 'Int'>;
    readonly type: Prisma.FieldRef<"Car", 'CarType'>;
    readonly transmission: Prisma.FieldRef<"Car", 'Transmission'>;
    readonly fuel: Prisma.FieldRef<"Car", 'FuelType'>;
    readonly seats: Prisma.FieldRef<"Car", 'Int'>;
    readonly city: Prisma.FieldRef<"Car", 'String'>;
    readonly pricePerDay: Prisma.FieldRef<"Car", 'Decimal'>;
    readonly status: Prisma.FieldRef<"Car", 'CarStatus'>;
    readonly createdAt: Prisma.FieldRef<"Car", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Car", 'DateTime'>;
}
export type CarFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CarSelect<ExtArgs> | null;
    omit?: Prisma.CarOmit<ExtArgs> | null;
    include?: Prisma.CarInclude<ExtArgs> | null;
    where: Prisma.CarWhereUniqueInput;
};
export type CarFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CarSelect<ExtArgs> | null;
    omit?: Prisma.CarOmit<ExtArgs> | null;
    include?: Prisma.CarInclude<ExtArgs> | null;
    where: Prisma.CarWhereUniqueInput;
};
export type CarFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CarFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CarFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CarCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CarSelect<ExtArgs> | null;
    omit?: Prisma.CarOmit<ExtArgs> | null;
    include?: Prisma.CarInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CarCreateInput, Prisma.CarUncheckedCreateInput>;
};
export type CarCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CarCreateManyInput | Prisma.CarCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CarCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CarSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CarOmit<ExtArgs> | null;
    data: Prisma.CarCreateManyInput | Prisma.CarCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CarIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CarUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CarSelect<ExtArgs> | null;
    omit?: Prisma.CarOmit<ExtArgs> | null;
    include?: Prisma.CarInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CarUpdateInput, Prisma.CarUncheckedUpdateInput>;
    where: Prisma.CarWhereUniqueInput;
};
export type CarUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CarUpdateManyMutationInput, Prisma.CarUncheckedUpdateManyInput>;
    where?: Prisma.CarWhereInput;
    limit?: number;
};
export type CarUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CarSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CarOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CarUpdateManyMutationInput, Prisma.CarUncheckedUpdateManyInput>;
    where?: Prisma.CarWhereInput;
    limit?: number;
    include?: Prisma.CarIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CarUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CarSelect<ExtArgs> | null;
    omit?: Prisma.CarOmit<ExtArgs> | null;
    include?: Prisma.CarInclude<ExtArgs> | null;
    where: Prisma.CarWhereUniqueInput;
    create: Prisma.XOR<Prisma.CarCreateInput, Prisma.CarUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CarUpdateInput, Prisma.CarUncheckedUpdateInput>;
};
export type CarDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CarSelect<ExtArgs> | null;
    omit?: Prisma.CarOmit<ExtArgs> | null;
    include?: Prisma.CarInclude<ExtArgs> | null;
    where: Prisma.CarWhereUniqueInput;
};
export type CarDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CarWhereInput;
    limit?: number;
};
export type Car$bookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Car$reviewsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CarDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CarSelect<ExtArgs> | null;
    omit?: Prisma.CarOmit<ExtArgs> | null;
    include?: Prisma.CarInclude<ExtArgs> | null;
};
