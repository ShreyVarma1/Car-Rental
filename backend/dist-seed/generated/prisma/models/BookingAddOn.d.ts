import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type BookingAddOnModel = runtime.Types.Result.DefaultSelection<Prisma.$BookingAddOnPayload>;
export type AggregateBookingAddOn = {
    _count: BookingAddOnCountAggregateOutputType | null;
    _avg: BookingAddOnAvgAggregateOutputType | null;
    _sum: BookingAddOnSumAggregateOutputType | null;
    _min: BookingAddOnMinAggregateOutputType | null;
    _max: BookingAddOnMaxAggregateOutputType | null;
};
export type BookingAddOnAvgAggregateOutputType = {
    pricePerDaySnapshot: runtime.Decimal | null;
};
export type BookingAddOnSumAggregateOutputType = {
    pricePerDaySnapshot: runtime.Decimal | null;
};
export type BookingAddOnMinAggregateOutputType = {
    id: string | null;
    bookingId: string | null;
    addOnId: string | null;
    pricePerDaySnapshot: runtime.Decimal | null;
};
export type BookingAddOnMaxAggregateOutputType = {
    id: string | null;
    bookingId: string | null;
    addOnId: string | null;
    pricePerDaySnapshot: runtime.Decimal | null;
};
export type BookingAddOnCountAggregateOutputType = {
    id: number;
    bookingId: number;
    addOnId: number;
    pricePerDaySnapshot: number;
    _all: number;
};
export type BookingAddOnAvgAggregateInputType = {
    pricePerDaySnapshot?: true;
};
export type BookingAddOnSumAggregateInputType = {
    pricePerDaySnapshot?: true;
};
export type BookingAddOnMinAggregateInputType = {
    id?: true;
    bookingId?: true;
    addOnId?: true;
    pricePerDaySnapshot?: true;
};
export type BookingAddOnMaxAggregateInputType = {
    id?: true;
    bookingId?: true;
    addOnId?: true;
    pricePerDaySnapshot?: true;
};
export type BookingAddOnCountAggregateInputType = {
    id?: true;
    bookingId?: true;
    addOnId?: true;
    pricePerDaySnapshot?: true;
    _all?: true;
};
export type BookingAddOnAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingAddOnWhereInput;
    orderBy?: Prisma.BookingAddOnOrderByWithRelationInput | Prisma.BookingAddOnOrderByWithRelationInput[];
    cursor?: Prisma.BookingAddOnWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BookingAddOnCountAggregateInputType;
    _avg?: BookingAddOnAvgAggregateInputType;
    _sum?: BookingAddOnSumAggregateInputType;
    _min?: BookingAddOnMinAggregateInputType;
    _max?: BookingAddOnMaxAggregateInputType;
};
export type GetBookingAddOnAggregateType<T extends BookingAddOnAggregateArgs> = {
    [P in keyof T & keyof AggregateBookingAddOn]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBookingAddOn[P]> : Prisma.GetScalarType<T[P], AggregateBookingAddOn[P]>;
};
export type BookingAddOnGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingAddOnWhereInput;
    orderBy?: Prisma.BookingAddOnOrderByWithAggregationInput | Prisma.BookingAddOnOrderByWithAggregationInput[];
    by: Prisma.BookingAddOnScalarFieldEnum[] | Prisma.BookingAddOnScalarFieldEnum;
    having?: Prisma.BookingAddOnScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BookingAddOnCountAggregateInputType | true;
    _avg?: BookingAddOnAvgAggregateInputType;
    _sum?: BookingAddOnSumAggregateInputType;
    _min?: BookingAddOnMinAggregateInputType;
    _max?: BookingAddOnMaxAggregateInputType;
};
export type BookingAddOnGroupByOutputType = {
    id: string;
    bookingId: string;
    addOnId: string;
    pricePerDaySnapshot: runtime.Decimal;
    _count: BookingAddOnCountAggregateOutputType | null;
    _avg: BookingAddOnAvgAggregateOutputType | null;
    _sum: BookingAddOnSumAggregateOutputType | null;
    _min: BookingAddOnMinAggregateOutputType | null;
    _max: BookingAddOnMaxAggregateOutputType | null;
};
export type GetBookingAddOnGroupByPayload<T extends BookingAddOnGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BookingAddOnGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BookingAddOnGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BookingAddOnGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BookingAddOnGroupByOutputType[P]>;
}>>;
export type BookingAddOnWhereInput = {
    AND?: Prisma.BookingAddOnWhereInput | Prisma.BookingAddOnWhereInput[];
    OR?: Prisma.BookingAddOnWhereInput[];
    NOT?: Prisma.BookingAddOnWhereInput | Prisma.BookingAddOnWhereInput[];
    id?: Prisma.StringFilter<"BookingAddOn"> | string;
    bookingId?: Prisma.StringFilter<"BookingAddOn"> | string;
    addOnId?: Prisma.StringFilter<"BookingAddOn"> | string;
    pricePerDaySnapshot?: Prisma.DecimalFilter<"BookingAddOn"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    booking?: Prisma.XOR<Prisma.BookingScalarRelationFilter, Prisma.BookingWhereInput>;
    addOn?: Prisma.XOR<Prisma.AddOnScalarRelationFilter, Prisma.AddOnWhereInput>;
};
export type BookingAddOnOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    addOnId?: Prisma.SortOrder;
    pricePerDaySnapshot?: Prisma.SortOrder;
    booking?: Prisma.BookingOrderByWithRelationInput;
    addOn?: Prisma.AddOnOrderByWithRelationInput;
};
export type BookingAddOnWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    bookingId_addOnId?: Prisma.BookingAddOnBookingIdAddOnIdCompoundUniqueInput;
    AND?: Prisma.BookingAddOnWhereInput | Prisma.BookingAddOnWhereInput[];
    OR?: Prisma.BookingAddOnWhereInput[];
    NOT?: Prisma.BookingAddOnWhereInput | Prisma.BookingAddOnWhereInput[];
    bookingId?: Prisma.StringFilter<"BookingAddOn"> | string;
    addOnId?: Prisma.StringFilter<"BookingAddOn"> | string;
    pricePerDaySnapshot?: Prisma.DecimalFilter<"BookingAddOn"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    booking?: Prisma.XOR<Prisma.BookingScalarRelationFilter, Prisma.BookingWhereInput>;
    addOn?: Prisma.XOR<Prisma.AddOnScalarRelationFilter, Prisma.AddOnWhereInput>;
}, "id" | "bookingId_addOnId">;
export type BookingAddOnOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    addOnId?: Prisma.SortOrder;
    pricePerDaySnapshot?: Prisma.SortOrder;
    _count?: Prisma.BookingAddOnCountOrderByAggregateInput;
    _avg?: Prisma.BookingAddOnAvgOrderByAggregateInput;
    _max?: Prisma.BookingAddOnMaxOrderByAggregateInput;
    _min?: Prisma.BookingAddOnMinOrderByAggregateInput;
    _sum?: Prisma.BookingAddOnSumOrderByAggregateInput;
};
export type BookingAddOnScalarWhereWithAggregatesInput = {
    AND?: Prisma.BookingAddOnScalarWhereWithAggregatesInput | Prisma.BookingAddOnScalarWhereWithAggregatesInput[];
    OR?: Prisma.BookingAddOnScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BookingAddOnScalarWhereWithAggregatesInput | Prisma.BookingAddOnScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"BookingAddOn"> | string;
    bookingId?: Prisma.StringWithAggregatesFilter<"BookingAddOn"> | string;
    addOnId?: Prisma.StringWithAggregatesFilter<"BookingAddOn"> | string;
    pricePerDaySnapshot?: Prisma.DecimalWithAggregatesFilter<"BookingAddOn"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type BookingAddOnCreateInput = {
    id?: string;
    pricePerDaySnapshot: runtime.Decimal | runtime.DecimalJsLike | number | string;
    booking: Prisma.BookingCreateNestedOneWithoutBookingAddOnsInput;
    addOn: Prisma.AddOnCreateNestedOneWithoutBookingAddOnsInput;
};
export type BookingAddOnUncheckedCreateInput = {
    id?: string;
    bookingId: string;
    addOnId: string;
    pricePerDaySnapshot: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type BookingAddOnUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pricePerDaySnapshot?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    booking?: Prisma.BookingUpdateOneRequiredWithoutBookingAddOnsNestedInput;
    addOn?: Prisma.AddOnUpdateOneRequiredWithoutBookingAddOnsNestedInput;
};
export type BookingAddOnUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    addOnId?: Prisma.StringFieldUpdateOperationsInput | string;
    pricePerDaySnapshot?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type BookingAddOnCreateManyInput = {
    id?: string;
    bookingId: string;
    addOnId: string;
    pricePerDaySnapshot: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type BookingAddOnUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pricePerDaySnapshot?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type BookingAddOnUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    addOnId?: Prisma.StringFieldUpdateOperationsInput | string;
    pricePerDaySnapshot?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type BookingAddOnListRelationFilter = {
    every?: Prisma.BookingAddOnWhereInput;
    some?: Prisma.BookingAddOnWhereInput;
    none?: Prisma.BookingAddOnWhereInput;
};
export type BookingAddOnOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type BookingAddOnBookingIdAddOnIdCompoundUniqueInput = {
    bookingId: string;
    addOnId: string;
};
export type BookingAddOnCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    addOnId?: Prisma.SortOrder;
    pricePerDaySnapshot?: Prisma.SortOrder;
};
export type BookingAddOnAvgOrderByAggregateInput = {
    pricePerDaySnapshot?: Prisma.SortOrder;
};
export type BookingAddOnMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    addOnId?: Prisma.SortOrder;
    pricePerDaySnapshot?: Prisma.SortOrder;
};
export type BookingAddOnMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    addOnId?: Prisma.SortOrder;
    pricePerDaySnapshot?: Prisma.SortOrder;
};
export type BookingAddOnSumOrderByAggregateInput = {
    pricePerDaySnapshot?: Prisma.SortOrder;
};
export type BookingAddOnCreateNestedManyWithoutAddOnInput = {
    create?: Prisma.XOR<Prisma.BookingAddOnCreateWithoutAddOnInput, Prisma.BookingAddOnUncheckedCreateWithoutAddOnInput> | Prisma.BookingAddOnCreateWithoutAddOnInput[] | Prisma.BookingAddOnUncheckedCreateWithoutAddOnInput[];
    connectOrCreate?: Prisma.BookingAddOnCreateOrConnectWithoutAddOnInput | Prisma.BookingAddOnCreateOrConnectWithoutAddOnInput[];
    createMany?: Prisma.BookingAddOnCreateManyAddOnInputEnvelope;
    connect?: Prisma.BookingAddOnWhereUniqueInput | Prisma.BookingAddOnWhereUniqueInput[];
};
export type BookingAddOnUncheckedCreateNestedManyWithoutAddOnInput = {
    create?: Prisma.XOR<Prisma.BookingAddOnCreateWithoutAddOnInput, Prisma.BookingAddOnUncheckedCreateWithoutAddOnInput> | Prisma.BookingAddOnCreateWithoutAddOnInput[] | Prisma.BookingAddOnUncheckedCreateWithoutAddOnInput[];
    connectOrCreate?: Prisma.BookingAddOnCreateOrConnectWithoutAddOnInput | Prisma.BookingAddOnCreateOrConnectWithoutAddOnInput[];
    createMany?: Prisma.BookingAddOnCreateManyAddOnInputEnvelope;
    connect?: Prisma.BookingAddOnWhereUniqueInput | Prisma.BookingAddOnWhereUniqueInput[];
};
export type BookingAddOnUpdateManyWithoutAddOnNestedInput = {
    create?: Prisma.XOR<Prisma.BookingAddOnCreateWithoutAddOnInput, Prisma.BookingAddOnUncheckedCreateWithoutAddOnInput> | Prisma.BookingAddOnCreateWithoutAddOnInput[] | Prisma.BookingAddOnUncheckedCreateWithoutAddOnInput[];
    connectOrCreate?: Prisma.BookingAddOnCreateOrConnectWithoutAddOnInput | Prisma.BookingAddOnCreateOrConnectWithoutAddOnInput[];
    upsert?: Prisma.BookingAddOnUpsertWithWhereUniqueWithoutAddOnInput | Prisma.BookingAddOnUpsertWithWhereUniqueWithoutAddOnInput[];
    createMany?: Prisma.BookingAddOnCreateManyAddOnInputEnvelope;
    set?: Prisma.BookingAddOnWhereUniqueInput | Prisma.BookingAddOnWhereUniqueInput[];
    disconnect?: Prisma.BookingAddOnWhereUniqueInput | Prisma.BookingAddOnWhereUniqueInput[];
    delete?: Prisma.BookingAddOnWhereUniqueInput | Prisma.BookingAddOnWhereUniqueInput[];
    connect?: Prisma.BookingAddOnWhereUniqueInput | Prisma.BookingAddOnWhereUniqueInput[];
    update?: Prisma.BookingAddOnUpdateWithWhereUniqueWithoutAddOnInput | Prisma.BookingAddOnUpdateWithWhereUniqueWithoutAddOnInput[];
    updateMany?: Prisma.BookingAddOnUpdateManyWithWhereWithoutAddOnInput | Prisma.BookingAddOnUpdateManyWithWhereWithoutAddOnInput[];
    deleteMany?: Prisma.BookingAddOnScalarWhereInput | Prisma.BookingAddOnScalarWhereInput[];
};
export type BookingAddOnUncheckedUpdateManyWithoutAddOnNestedInput = {
    create?: Prisma.XOR<Prisma.BookingAddOnCreateWithoutAddOnInput, Prisma.BookingAddOnUncheckedCreateWithoutAddOnInput> | Prisma.BookingAddOnCreateWithoutAddOnInput[] | Prisma.BookingAddOnUncheckedCreateWithoutAddOnInput[];
    connectOrCreate?: Prisma.BookingAddOnCreateOrConnectWithoutAddOnInput | Prisma.BookingAddOnCreateOrConnectWithoutAddOnInput[];
    upsert?: Prisma.BookingAddOnUpsertWithWhereUniqueWithoutAddOnInput | Prisma.BookingAddOnUpsertWithWhereUniqueWithoutAddOnInput[];
    createMany?: Prisma.BookingAddOnCreateManyAddOnInputEnvelope;
    set?: Prisma.BookingAddOnWhereUniqueInput | Prisma.BookingAddOnWhereUniqueInput[];
    disconnect?: Prisma.BookingAddOnWhereUniqueInput | Prisma.BookingAddOnWhereUniqueInput[];
    delete?: Prisma.BookingAddOnWhereUniqueInput | Prisma.BookingAddOnWhereUniqueInput[];
    connect?: Prisma.BookingAddOnWhereUniqueInput | Prisma.BookingAddOnWhereUniqueInput[];
    update?: Prisma.BookingAddOnUpdateWithWhereUniqueWithoutAddOnInput | Prisma.BookingAddOnUpdateWithWhereUniqueWithoutAddOnInput[];
    updateMany?: Prisma.BookingAddOnUpdateManyWithWhereWithoutAddOnInput | Prisma.BookingAddOnUpdateManyWithWhereWithoutAddOnInput[];
    deleteMany?: Prisma.BookingAddOnScalarWhereInput | Prisma.BookingAddOnScalarWhereInput[];
};
export type BookingAddOnCreateNestedManyWithoutBookingInput = {
    create?: Prisma.XOR<Prisma.BookingAddOnCreateWithoutBookingInput, Prisma.BookingAddOnUncheckedCreateWithoutBookingInput> | Prisma.BookingAddOnCreateWithoutBookingInput[] | Prisma.BookingAddOnUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.BookingAddOnCreateOrConnectWithoutBookingInput | Prisma.BookingAddOnCreateOrConnectWithoutBookingInput[];
    createMany?: Prisma.BookingAddOnCreateManyBookingInputEnvelope;
    connect?: Prisma.BookingAddOnWhereUniqueInput | Prisma.BookingAddOnWhereUniqueInput[];
};
export type BookingAddOnUncheckedCreateNestedManyWithoutBookingInput = {
    create?: Prisma.XOR<Prisma.BookingAddOnCreateWithoutBookingInput, Prisma.BookingAddOnUncheckedCreateWithoutBookingInput> | Prisma.BookingAddOnCreateWithoutBookingInput[] | Prisma.BookingAddOnUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.BookingAddOnCreateOrConnectWithoutBookingInput | Prisma.BookingAddOnCreateOrConnectWithoutBookingInput[];
    createMany?: Prisma.BookingAddOnCreateManyBookingInputEnvelope;
    connect?: Prisma.BookingAddOnWhereUniqueInput | Prisma.BookingAddOnWhereUniqueInput[];
};
export type BookingAddOnUpdateManyWithoutBookingNestedInput = {
    create?: Prisma.XOR<Prisma.BookingAddOnCreateWithoutBookingInput, Prisma.BookingAddOnUncheckedCreateWithoutBookingInput> | Prisma.BookingAddOnCreateWithoutBookingInput[] | Prisma.BookingAddOnUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.BookingAddOnCreateOrConnectWithoutBookingInput | Prisma.BookingAddOnCreateOrConnectWithoutBookingInput[];
    upsert?: Prisma.BookingAddOnUpsertWithWhereUniqueWithoutBookingInput | Prisma.BookingAddOnUpsertWithWhereUniqueWithoutBookingInput[];
    createMany?: Prisma.BookingAddOnCreateManyBookingInputEnvelope;
    set?: Prisma.BookingAddOnWhereUniqueInput | Prisma.BookingAddOnWhereUniqueInput[];
    disconnect?: Prisma.BookingAddOnWhereUniqueInput | Prisma.BookingAddOnWhereUniqueInput[];
    delete?: Prisma.BookingAddOnWhereUniqueInput | Prisma.BookingAddOnWhereUniqueInput[];
    connect?: Prisma.BookingAddOnWhereUniqueInput | Prisma.BookingAddOnWhereUniqueInput[];
    update?: Prisma.BookingAddOnUpdateWithWhereUniqueWithoutBookingInput | Prisma.BookingAddOnUpdateWithWhereUniqueWithoutBookingInput[];
    updateMany?: Prisma.BookingAddOnUpdateManyWithWhereWithoutBookingInput | Prisma.BookingAddOnUpdateManyWithWhereWithoutBookingInput[];
    deleteMany?: Prisma.BookingAddOnScalarWhereInput | Prisma.BookingAddOnScalarWhereInput[];
};
export type BookingAddOnUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: Prisma.XOR<Prisma.BookingAddOnCreateWithoutBookingInput, Prisma.BookingAddOnUncheckedCreateWithoutBookingInput> | Prisma.BookingAddOnCreateWithoutBookingInput[] | Prisma.BookingAddOnUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.BookingAddOnCreateOrConnectWithoutBookingInput | Prisma.BookingAddOnCreateOrConnectWithoutBookingInput[];
    upsert?: Prisma.BookingAddOnUpsertWithWhereUniqueWithoutBookingInput | Prisma.BookingAddOnUpsertWithWhereUniqueWithoutBookingInput[];
    createMany?: Prisma.BookingAddOnCreateManyBookingInputEnvelope;
    set?: Prisma.BookingAddOnWhereUniqueInput | Prisma.BookingAddOnWhereUniqueInput[];
    disconnect?: Prisma.BookingAddOnWhereUniqueInput | Prisma.BookingAddOnWhereUniqueInput[];
    delete?: Prisma.BookingAddOnWhereUniqueInput | Prisma.BookingAddOnWhereUniqueInput[];
    connect?: Prisma.BookingAddOnWhereUniqueInput | Prisma.BookingAddOnWhereUniqueInput[];
    update?: Prisma.BookingAddOnUpdateWithWhereUniqueWithoutBookingInput | Prisma.BookingAddOnUpdateWithWhereUniqueWithoutBookingInput[];
    updateMany?: Prisma.BookingAddOnUpdateManyWithWhereWithoutBookingInput | Prisma.BookingAddOnUpdateManyWithWhereWithoutBookingInput[];
    deleteMany?: Prisma.BookingAddOnScalarWhereInput | Prisma.BookingAddOnScalarWhereInput[];
};
export type BookingAddOnCreateWithoutAddOnInput = {
    id?: string;
    pricePerDaySnapshot: runtime.Decimal | runtime.DecimalJsLike | number | string;
    booking: Prisma.BookingCreateNestedOneWithoutBookingAddOnsInput;
};
export type BookingAddOnUncheckedCreateWithoutAddOnInput = {
    id?: string;
    bookingId: string;
    pricePerDaySnapshot: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type BookingAddOnCreateOrConnectWithoutAddOnInput = {
    where: Prisma.BookingAddOnWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingAddOnCreateWithoutAddOnInput, Prisma.BookingAddOnUncheckedCreateWithoutAddOnInput>;
};
export type BookingAddOnCreateManyAddOnInputEnvelope = {
    data: Prisma.BookingAddOnCreateManyAddOnInput | Prisma.BookingAddOnCreateManyAddOnInput[];
    skipDuplicates?: boolean;
};
export type BookingAddOnUpsertWithWhereUniqueWithoutAddOnInput = {
    where: Prisma.BookingAddOnWhereUniqueInput;
    update: Prisma.XOR<Prisma.BookingAddOnUpdateWithoutAddOnInput, Prisma.BookingAddOnUncheckedUpdateWithoutAddOnInput>;
    create: Prisma.XOR<Prisma.BookingAddOnCreateWithoutAddOnInput, Prisma.BookingAddOnUncheckedCreateWithoutAddOnInput>;
};
export type BookingAddOnUpdateWithWhereUniqueWithoutAddOnInput = {
    where: Prisma.BookingAddOnWhereUniqueInput;
    data: Prisma.XOR<Prisma.BookingAddOnUpdateWithoutAddOnInput, Prisma.BookingAddOnUncheckedUpdateWithoutAddOnInput>;
};
export type BookingAddOnUpdateManyWithWhereWithoutAddOnInput = {
    where: Prisma.BookingAddOnScalarWhereInput;
    data: Prisma.XOR<Prisma.BookingAddOnUpdateManyMutationInput, Prisma.BookingAddOnUncheckedUpdateManyWithoutAddOnInput>;
};
export type BookingAddOnScalarWhereInput = {
    AND?: Prisma.BookingAddOnScalarWhereInput | Prisma.BookingAddOnScalarWhereInput[];
    OR?: Prisma.BookingAddOnScalarWhereInput[];
    NOT?: Prisma.BookingAddOnScalarWhereInput | Prisma.BookingAddOnScalarWhereInput[];
    id?: Prisma.StringFilter<"BookingAddOn"> | string;
    bookingId?: Prisma.StringFilter<"BookingAddOn"> | string;
    addOnId?: Prisma.StringFilter<"BookingAddOn"> | string;
    pricePerDaySnapshot?: Prisma.DecimalFilter<"BookingAddOn"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type BookingAddOnCreateWithoutBookingInput = {
    id?: string;
    pricePerDaySnapshot: runtime.Decimal | runtime.DecimalJsLike | number | string;
    addOn: Prisma.AddOnCreateNestedOneWithoutBookingAddOnsInput;
};
export type BookingAddOnUncheckedCreateWithoutBookingInput = {
    id?: string;
    addOnId: string;
    pricePerDaySnapshot: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type BookingAddOnCreateOrConnectWithoutBookingInput = {
    where: Prisma.BookingAddOnWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingAddOnCreateWithoutBookingInput, Prisma.BookingAddOnUncheckedCreateWithoutBookingInput>;
};
export type BookingAddOnCreateManyBookingInputEnvelope = {
    data: Prisma.BookingAddOnCreateManyBookingInput | Prisma.BookingAddOnCreateManyBookingInput[];
    skipDuplicates?: boolean;
};
export type BookingAddOnUpsertWithWhereUniqueWithoutBookingInput = {
    where: Prisma.BookingAddOnWhereUniqueInput;
    update: Prisma.XOR<Prisma.BookingAddOnUpdateWithoutBookingInput, Prisma.BookingAddOnUncheckedUpdateWithoutBookingInput>;
    create: Prisma.XOR<Prisma.BookingAddOnCreateWithoutBookingInput, Prisma.BookingAddOnUncheckedCreateWithoutBookingInput>;
};
export type BookingAddOnUpdateWithWhereUniqueWithoutBookingInput = {
    where: Prisma.BookingAddOnWhereUniqueInput;
    data: Prisma.XOR<Prisma.BookingAddOnUpdateWithoutBookingInput, Prisma.BookingAddOnUncheckedUpdateWithoutBookingInput>;
};
export type BookingAddOnUpdateManyWithWhereWithoutBookingInput = {
    where: Prisma.BookingAddOnScalarWhereInput;
    data: Prisma.XOR<Prisma.BookingAddOnUpdateManyMutationInput, Prisma.BookingAddOnUncheckedUpdateManyWithoutBookingInput>;
};
export type BookingAddOnCreateManyAddOnInput = {
    id?: string;
    bookingId: string;
    pricePerDaySnapshot: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type BookingAddOnUpdateWithoutAddOnInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pricePerDaySnapshot?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    booking?: Prisma.BookingUpdateOneRequiredWithoutBookingAddOnsNestedInput;
};
export type BookingAddOnUncheckedUpdateWithoutAddOnInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    pricePerDaySnapshot?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type BookingAddOnUncheckedUpdateManyWithoutAddOnInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    pricePerDaySnapshot?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type BookingAddOnCreateManyBookingInput = {
    id?: string;
    addOnId: string;
    pricePerDaySnapshot: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type BookingAddOnUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pricePerDaySnapshot?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    addOn?: Prisma.AddOnUpdateOneRequiredWithoutBookingAddOnsNestedInput;
};
export type BookingAddOnUncheckedUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    addOnId?: Prisma.StringFieldUpdateOperationsInput | string;
    pricePerDaySnapshot?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type BookingAddOnUncheckedUpdateManyWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    addOnId?: Prisma.StringFieldUpdateOperationsInput | string;
    pricePerDaySnapshot?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type BookingAddOnSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingId?: boolean;
    addOnId?: boolean;
    pricePerDaySnapshot?: boolean;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    addOn?: boolean | Prisma.AddOnDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["bookingAddOn"]>;
export type BookingAddOnSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingId?: boolean;
    addOnId?: boolean;
    pricePerDaySnapshot?: boolean;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    addOn?: boolean | Prisma.AddOnDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["bookingAddOn"]>;
export type BookingAddOnSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingId?: boolean;
    addOnId?: boolean;
    pricePerDaySnapshot?: boolean;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    addOn?: boolean | Prisma.AddOnDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["bookingAddOn"]>;
export type BookingAddOnSelectScalar = {
    id?: boolean;
    bookingId?: boolean;
    addOnId?: boolean;
    pricePerDaySnapshot?: boolean;
};
export type BookingAddOnOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "bookingId" | "addOnId" | "pricePerDaySnapshot", ExtArgs["result"]["bookingAddOn"]>;
export type BookingAddOnInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    addOn?: boolean | Prisma.AddOnDefaultArgs<ExtArgs>;
};
export type BookingAddOnIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    addOn?: boolean | Prisma.AddOnDefaultArgs<ExtArgs>;
};
export type BookingAddOnIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    addOn?: boolean | Prisma.AddOnDefaultArgs<ExtArgs>;
};
export type $BookingAddOnPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "BookingAddOn";
    objects: {
        booking: Prisma.$BookingPayload<ExtArgs>;
        addOn: Prisma.$AddOnPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        bookingId: string;
        addOnId: string;
        pricePerDaySnapshot: runtime.Decimal;
    }, ExtArgs["result"]["bookingAddOn"]>;
    composites: {};
};
export type BookingAddOnGetPayload<S extends boolean | null | undefined | BookingAddOnDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BookingAddOnPayload, S>;
export type BookingAddOnCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BookingAddOnFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BookingAddOnCountAggregateInputType | true;
};
export interface BookingAddOnDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['BookingAddOn'];
        meta: {
            name: 'BookingAddOn';
        };
    };
    findUnique<T extends BookingAddOnFindUniqueArgs>(args: Prisma.SelectSubset<T, BookingAddOnFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BookingAddOnClient<runtime.Types.Result.GetResult<Prisma.$BookingAddOnPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BookingAddOnFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BookingAddOnFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BookingAddOnClient<runtime.Types.Result.GetResult<Prisma.$BookingAddOnPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BookingAddOnFindFirstArgs>(args?: Prisma.SelectSubset<T, BookingAddOnFindFirstArgs<ExtArgs>>): Prisma.Prisma__BookingAddOnClient<runtime.Types.Result.GetResult<Prisma.$BookingAddOnPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BookingAddOnFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BookingAddOnFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BookingAddOnClient<runtime.Types.Result.GetResult<Prisma.$BookingAddOnPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BookingAddOnFindManyArgs>(args?: Prisma.SelectSubset<T, BookingAddOnFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingAddOnPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BookingAddOnCreateArgs>(args: Prisma.SelectSubset<T, BookingAddOnCreateArgs<ExtArgs>>): Prisma.Prisma__BookingAddOnClient<runtime.Types.Result.GetResult<Prisma.$BookingAddOnPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BookingAddOnCreateManyArgs>(args?: Prisma.SelectSubset<T, BookingAddOnCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BookingAddOnCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BookingAddOnCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingAddOnPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BookingAddOnDeleteArgs>(args: Prisma.SelectSubset<T, BookingAddOnDeleteArgs<ExtArgs>>): Prisma.Prisma__BookingAddOnClient<runtime.Types.Result.GetResult<Prisma.$BookingAddOnPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BookingAddOnUpdateArgs>(args: Prisma.SelectSubset<T, BookingAddOnUpdateArgs<ExtArgs>>): Prisma.Prisma__BookingAddOnClient<runtime.Types.Result.GetResult<Prisma.$BookingAddOnPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BookingAddOnDeleteManyArgs>(args?: Prisma.SelectSubset<T, BookingAddOnDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BookingAddOnUpdateManyArgs>(args: Prisma.SelectSubset<T, BookingAddOnUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BookingAddOnUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BookingAddOnUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingAddOnPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BookingAddOnUpsertArgs>(args: Prisma.SelectSubset<T, BookingAddOnUpsertArgs<ExtArgs>>): Prisma.Prisma__BookingAddOnClient<runtime.Types.Result.GetResult<Prisma.$BookingAddOnPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BookingAddOnCountArgs>(args?: Prisma.Subset<T, BookingAddOnCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BookingAddOnCountAggregateOutputType> : number>;
    aggregate<T extends BookingAddOnAggregateArgs>(args: Prisma.Subset<T, BookingAddOnAggregateArgs>): Prisma.PrismaPromise<GetBookingAddOnAggregateType<T>>;
    groupBy<T extends BookingAddOnGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BookingAddOnGroupByArgs['orderBy'];
    } : {
        orderBy?: BookingAddOnGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BookingAddOnGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingAddOnGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BookingAddOnFieldRefs;
}
export interface Prisma__BookingAddOnClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    booking<T extends Prisma.BookingDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BookingDefaultArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    addOn<T extends Prisma.AddOnDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AddOnDefaultArgs<ExtArgs>>): Prisma.Prisma__AddOnClient<runtime.Types.Result.GetResult<Prisma.$AddOnPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BookingAddOnFieldRefs {
    readonly id: Prisma.FieldRef<"BookingAddOn", 'String'>;
    readonly bookingId: Prisma.FieldRef<"BookingAddOn", 'String'>;
    readonly addOnId: Prisma.FieldRef<"BookingAddOn", 'String'>;
    readonly pricePerDaySnapshot: Prisma.FieldRef<"BookingAddOn", 'Decimal'>;
}
export type BookingAddOnFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingAddOnSelect<ExtArgs> | null;
    omit?: Prisma.BookingAddOnOmit<ExtArgs> | null;
    include?: Prisma.BookingAddOnInclude<ExtArgs> | null;
    where: Prisma.BookingAddOnWhereUniqueInput;
};
export type BookingAddOnFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingAddOnSelect<ExtArgs> | null;
    omit?: Prisma.BookingAddOnOmit<ExtArgs> | null;
    include?: Prisma.BookingAddOnInclude<ExtArgs> | null;
    where: Prisma.BookingAddOnWhereUniqueInput;
};
export type BookingAddOnFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingAddOnSelect<ExtArgs> | null;
    omit?: Prisma.BookingAddOnOmit<ExtArgs> | null;
    include?: Prisma.BookingAddOnInclude<ExtArgs> | null;
    where?: Prisma.BookingAddOnWhereInput;
    orderBy?: Prisma.BookingAddOnOrderByWithRelationInput | Prisma.BookingAddOnOrderByWithRelationInput[];
    cursor?: Prisma.BookingAddOnWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BookingAddOnScalarFieldEnum | Prisma.BookingAddOnScalarFieldEnum[];
};
export type BookingAddOnFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingAddOnSelect<ExtArgs> | null;
    omit?: Prisma.BookingAddOnOmit<ExtArgs> | null;
    include?: Prisma.BookingAddOnInclude<ExtArgs> | null;
    where?: Prisma.BookingAddOnWhereInput;
    orderBy?: Prisma.BookingAddOnOrderByWithRelationInput | Prisma.BookingAddOnOrderByWithRelationInput[];
    cursor?: Prisma.BookingAddOnWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BookingAddOnScalarFieldEnum | Prisma.BookingAddOnScalarFieldEnum[];
};
export type BookingAddOnFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingAddOnSelect<ExtArgs> | null;
    omit?: Prisma.BookingAddOnOmit<ExtArgs> | null;
    include?: Prisma.BookingAddOnInclude<ExtArgs> | null;
    where?: Prisma.BookingAddOnWhereInput;
    orderBy?: Prisma.BookingAddOnOrderByWithRelationInput | Prisma.BookingAddOnOrderByWithRelationInput[];
    cursor?: Prisma.BookingAddOnWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BookingAddOnScalarFieldEnum | Prisma.BookingAddOnScalarFieldEnum[];
};
export type BookingAddOnCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingAddOnSelect<ExtArgs> | null;
    omit?: Prisma.BookingAddOnOmit<ExtArgs> | null;
    include?: Prisma.BookingAddOnInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BookingAddOnCreateInput, Prisma.BookingAddOnUncheckedCreateInput>;
};
export type BookingAddOnCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BookingAddOnCreateManyInput | Prisma.BookingAddOnCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BookingAddOnCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingAddOnSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BookingAddOnOmit<ExtArgs> | null;
    data: Prisma.BookingAddOnCreateManyInput | Prisma.BookingAddOnCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.BookingAddOnIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type BookingAddOnUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingAddOnSelect<ExtArgs> | null;
    omit?: Prisma.BookingAddOnOmit<ExtArgs> | null;
    include?: Prisma.BookingAddOnInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BookingAddOnUpdateInput, Prisma.BookingAddOnUncheckedUpdateInput>;
    where: Prisma.BookingAddOnWhereUniqueInput;
};
export type BookingAddOnUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BookingAddOnUpdateManyMutationInput, Prisma.BookingAddOnUncheckedUpdateManyInput>;
    where?: Prisma.BookingAddOnWhereInput;
    limit?: number;
};
export type BookingAddOnUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingAddOnSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BookingAddOnOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BookingAddOnUpdateManyMutationInput, Prisma.BookingAddOnUncheckedUpdateManyInput>;
    where?: Prisma.BookingAddOnWhereInput;
    limit?: number;
    include?: Prisma.BookingAddOnIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type BookingAddOnUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingAddOnSelect<ExtArgs> | null;
    omit?: Prisma.BookingAddOnOmit<ExtArgs> | null;
    include?: Prisma.BookingAddOnInclude<ExtArgs> | null;
    where: Prisma.BookingAddOnWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingAddOnCreateInput, Prisma.BookingAddOnUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BookingAddOnUpdateInput, Prisma.BookingAddOnUncheckedUpdateInput>;
};
export type BookingAddOnDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingAddOnSelect<ExtArgs> | null;
    omit?: Prisma.BookingAddOnOmit<ExtArgs> | null;
    include?: Prisma.BookingAddOnInclude<ExtArgs> | null;
    where: Prisma.BookingAddOnWhereUniqueInput;
};
export type BookingAddOnDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingAddOnWhereInput;
    limit?: number;
};
export type BookingAddOnDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingAddOnSelect<ExtArgs> | null;
    omit?: Prisma.BookingAddOnOmit<ExtArgs> | null;
    include?: Prisma.BookingAddOnInclude<ExtArgs> | null;
};
