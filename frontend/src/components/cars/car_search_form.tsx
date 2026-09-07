"use client";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import {
  FormEvent,
  useState,
} from "react";

import {
  CarType,
  FuelType,
  SearchCarsParams,
  Transmission,
} from "@/types/car";

interface CarSearchFormProps {
  initialValues: SearchCarsParams;
  onSearch: (
    values: SearchCarsParams,
  ) => void;
}

export default function CarSearchForm({
  initialValues,
  onSearch,
}: CarSearchFormProps) {
  const [city, setCity] =
    useState(initialValues.city ?? "");

  const [search, setSearch] =
    useState(initialValues.search ?? "");

  const [type, setType] =
    useState<CarType | "">(
      initialValues.type ?? "",
    );

  const [transmission, setTransmission] =
    useState<Transmission | "">(
      initialValues.transmission ?? "",
    );

  const [fuel, setFuel] =
    useState<FuelType | "">(
      initialValues.fuel ?? "",
    );

  const [seats, setSeats] =
    useState(
      initialValues.seats?.toString() ?? "",
    );

  const [minPrice, setMinPrice] =
    useState(
      initialValues.minPrice?.toString() ?? "",
    );

  const [maxPrice, setMaxPrice] =
    useState(
      initialValues.maxPrice?.toString() ?? "",
    );

  const [pickupAt, setPickupAt] =
    useState(
      initialValues.pickupAt ?? "",
    );

  const [dropOffAt, setDropOffAt] =
    useState(
      initialValues.dropOffAt ?? "",
    );

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const values: SearchCarsParams = {
      city: city || undefined,
      search: search || undefined,
      type: type || undefined,
      transmission:
        transmission || undefined,
      fuel: fuel || undefined,
      seats: seats
        ? Number(seats)
        : undefined,
      minPrice: minPrice
        ? Number(minPrice)
        : undefined,
      maxPrice: maxPrice
        ? Number(maxPrice)
        : undefined,
      pickupAt:
        pickupAt || undefined,
      dropOffAt:
        dropOffAt || undefined,
      sortBy: "createdAt",
      sortOrder: "desc",
    };

    onSearch(values);
  }

  function handleClear() {
    setCity("");
    setSearch("");
    setType("");
    setTransmission("");
    setFuel("");
    setSeats("");
    setMinPrice("");
    setMaxPrice("");
    setPickupAt("");
    setDropOffAt("");

    onSearch({
      page: 1,
      limit: 10,
      sortBy: "createdAt",
      sortOrder: "desc",
    });
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mb: 4,
        p: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
        boxShadow: 1,
      }}
    >
      <Stack spacing={2}>
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          spacing={2}
        >
          <TextField
            label="City"
            value={city}
            onChange={(event) =>
              setCity(event.target.value)
            }
            fullWidth
          />

          <TextField
            label="Search"
            placeholder="Make or model"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            fullWidth
          />
        </Stack>

        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          spacing={2}
        >
          <FormControl fullWidth>
            <InputLabel>
              Car Type
            </InputLabel>

            <Select
              value={type}
              label="Car Type"
              onChange={(event) =>
                setType(
                  event.target.value as
                    | CarType
                    | "",
                )
              }
            >
              <MenuItem value="">
                All
              </MenuItem>

              <MenuItem value="HATCHBACK">
                Hatchback
              </MenuItem>

              <MenuItem value="SEDAN">
                Sedan
              </MenuItem>

              <MenuItem value="SUV">
                SUV
              </MenuItem>

              <MenuItem value="MUV">
                MUV
              </MenuItem>

              <MenuItem value="LUXURY">
                Luxury
              </MenuItem>

              <MenuItem value="ELECTRIC">
                Electric
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>
              Transmission
            </InputLabel>

            <Select
              value={transmission}
              label="Transmission"
              onChange={(event) =>
                setTransmission(
                  event.target.value as
                    | Transmission
                    | "",
                )
              }
            >
              <MenuItem value="">
                All
              </MenuItem>

              <MenuItem value="MANUAL">
                Manual
              </MenuItem>

              <MenuItem value="AUTOMATIC">
                Automatic
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>
              Fuel
            </InputLabel>

            <Select
              value={fuel}
              label="Fuel"
              onChange={(event) =>
                setFuel(
                  event.target.value as
                    | FuelType
                    | "",
                )
              }
            >
              <MenuItem value="">
                All
              </MenuItem>

              <MenuItem value="PETROL">
                Petrol
              </MenuItem>

              <MenuItem value="DIESEL">
                Diesel
              </MenuItem>

              <MenuItem value="ELECTRIC">
                Electric
              </MenuItem>

              <MenuItem value="HYBRID">
                Hybrid
              </MenuItem>

              <MenuItem value="CNG">
                CNG
              </MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          spacing={2}
        >
          <TextField
            label="Seats"
            type="number"
            value={seats}
            onChange={(event) =>
              setSeats(event.target.value)
            }
            slotProps={{ htmlInput: { min: 1 } }}
            fullWidth
          />

          <TextField
            label="Min Price / Day"
            type="number"
            value={minPrice}
            onChange={(event) =>
              setMinPrice(event.target.value)
            }
            slotProps={{ htmlInput: { min: 0 } }}
            fullWidth
          />

          <TextField
            label="Max Price / Day"
            type="number"
            value={maxPrice}
            onChange={(event) =>
              setMaxPrice(event.target.value)
            }
            slotProps={{ htmlInput: { min: 0 } }}
            fullWidth
          />
        </Stack>

        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          spacing={2}
        >
          <TextField
            label="Pickup"
            type="datetime-local"
            value={pickupAt}
            onChange={(event) =>
              setPickupAt(event.target.value)
            }
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
          />

          <TextField
            label="Drop-off"
            type="datetime-local"
            value={dropOffAt}
            onChange={(event) =>
              setDropOffAt(event.target.value)
            }
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
          />
        </Stack>

        <Stack
          direction="row"
          spacing={2}
        >
          <Button
            type="submit"
            variant="contained"
            size="large"
          >
            Search Cars
          </Button>

          <Button
            type="button"
            variant="outlined"
            size="large"
            onClick={handleClear}
          >
            Clear
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}