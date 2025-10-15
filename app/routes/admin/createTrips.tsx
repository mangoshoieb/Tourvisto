import { Header } from "~/components";
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import type { Route } from "./+types/createTrips";
import { comboBoxItems, selectItems } from "~/constants";
import { cn, formatKey } from "../../../lib/utils";
import {
  LayerDirective,
  LayersDirective,
  MapsComponent,
} from "@syncfusion/ej2-react-maps";
import { world_map } from "~/constants/world_map";
import React, { use, useState } from "react";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { account } from "~/appwrite/client";
import { useNavigate } from "react-router";

export const loader = async () => {
  try {
    console.log("hi");
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,latlng,maps"
    );
    const json = await response.json();
    return json.map((country: any) => ({
      name: country.name.common,
      value: country.name.common,
      flagUrl: country.flags?.png || "",
      coordinates: country.latlng,
      streetsMap: country.maps?.openStreetMaps,
    }));
  } catch (error) {
    console.log("error fetching countries:", error);
    throw error;
  }
};

const CreateTrips = ({ loaderData }: Route.ComponentProps) => {
  const countries = loaderData as Country[];
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TripFormData>({
    country: countries[0]?.name || "",
    duration: 0,
    groupType: "",
    travelStyle: "",
    interest: "",
    budget: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (
      !formData.country ||
      !formData.groupType ||
      !formData.travelStyle ||
      !formData.interest ||
      !formData.budget
    ) {
      setError("Please provide values for all fields");
      setLoading(false);
      return;
    }
    if (formData?.duration < 1 || formData.duration > 10) {
      setError("Duration must be between 1 and 10");
      setLoading(false);
      return;
    }
    const user = await account.get();
    if (!user.$id) {
      console.error("User not authenticated");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch("/api/create-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country: formData.country,
          duration: formData.duration,
          budget: formData.budget,
          interest: formData.interest,
          travelStyle: formData.travelStyle,
          groupType: formData.groupType,
          userId: user.$id,
        }),
      });
      const result: CreateTripResponse = await response.json();
      if (result?.id) navigate(`/trips/${result.id}`);
      else console.error("failed to generate a trip");
    } catch (e) {
      console.error("error generating trip", e);
    } finally {
      setLoading(false);
      setError(null);
    }
  };
  const handleChange = (key: keyof TripFormData, value: string | number) => {
    setFormData({ ...formData, [key]: value });
  };
  const countryData = countries.map((country: any) => ({
    text: country.name,
    value: country.value,
    flagUrl: country.flagUrl,
  }));
  const mapData = [
    {
      country: formData.country,
      color: "#EA382E",
      coordinates:
        countries.find((c: Country) => c.name === formData.country)
          ?.coordinates || [],
    },
  ];
  const itemTemplate = (data: any) => (
    <div className="flex items-center gap-2 pl-2">
      <img src={data.flagUrl} alt={data.text} className="w-5 h-4 rounded-sm" />
      <span>{data.text}</span>
    </div>
  );
  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
      <Header
        title={"Add new trip"}
        desc={"view and edit Ai generated travel plans"}
      />
      <section className="mt-2.5 wrapper-md">
        <form className="trip-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="country">Country</label>
            <ComboBoxComponent
              id="country"
              dataSource={countryData}
              placeholder={"Select a country"}
              fields={{ text: "text", value: "value" }}
              className="combo-box"
              itemTemplate={itemTemplate}
              change={(e: { value: number | undefined }) => {
                if (e.value) {
                  handleChange("country", e.value);
                }
              }}
              allowFiltering
              filtering={(e) => {
                const query = e.text.toLowerCase();

                e.updateData(
                  countries
                    .filter((country) =>
                      country.name.toLowerCase().includes(query)
                    )
                    .map((country) => ({
                      text: country.name,
                      value: country.value,
                      flagUrl: country.flagUrl,
                    }))
                );
              }}
            />
          </div>

          <div>
            <label htmlFor="duration">Duration</label>
            <input
              id="duration"
              name="duration"
              type="number"
              placeholder="enter a number of days"
              className="form-input palceholder:text-gray-100"
              onChange={(e) => handleChange("duration", Number(e.target.value))}
            />
          </div>

          {selectItems.map((key) => (
            <div key={key}>
              <label htmlFor={key}>{formatKey(key)}</label>

              <ComboBoxComponent
                id={key}
                dataSource={comboBoxItems[key].map((item) => ({
                  text: item,
                  value: item,
                }))}
                fields={{ text: "text", value: "value" }}
                className="combo-box"
                placeholder={`Select ${formatKey(key)}`}
                change={(e: { value: number | undefined }) => {
                  if (e.value) {
                    handleChange(key, e.value);
                  }
                }}
                allowFiltering
                filtering={(e) => {
                  const query = e.text.toLowerCase();

                  e.updateData(
                    comboBoxItems[key]
                      .filter((item) => item.toLowerCase().includes(query))
                      .map((item) => ({
                        text: item,
                        value: item,
                      }))
                  );
                }}
              />
            </div>
          ))}

          <div>
            <label key="location"> Location in the world</label>
            <MapsComponent>
              <LayersDirective>
                <LayerDirective
                  dataSource={mapData}
                  shapeData={world_map}
                  shapeDataPath="country"
                  shapePropertyPath="name"
                  shapeSettings={{ colorValuePath: "color", fill: "#E5E5E5" }}
                />
              </LayersDirective>
            </MapsComponent>
          </div>

          <div className="bg-gray-300 w-full h-[2px]" />

          {error && (
            <div className="error">
              <p>{error}</p>
            </div>
          )}
          <footer className="w-full px-6">
            <ButtonComponent
              type="submit"
              className="button-class !h-12 !w-full"
              disabled={loading}
            >
              <img
                src={`/assets/icons/${
                  loading ? "loader.svg" : "magic-star.svg"
                }`}
                alt="icon"
                className={cn("size-5", { "animate-spin": loading })}
              />
              <span className="p-16-semibold text-white">
                {loading ? "Generating ..." : "Generate a Trip"}
              </span>
            </ButtonComponent>
          </footer>
        </form>
      </section>
    </main>
  );
};
export default CreateTrips;
