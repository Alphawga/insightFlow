import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TargetingOptionsProps {
  value: {
    locations?: string[];
    languages?: string[];
    demographics?: {
      ageRanges?: string[];
      genders?: string[];
      parentalStatus?: string[];
      householdIncome?: string[];
    };
    interests?: string[];
    keywords?: string[];
  };
  onChange: (value: any) => void;
}

const AGE_RANGES = [
  "18-24",
  "25-34",
  "35-44",
  "45-54",
  "55-64",
  "65 or more",
];

const GENDERS = ["Male", "Female", "Unknown"];

const PARENTAL_STATUS = [
  "Parent",
  "Not a parent",
  "Unknown",
];

const HOUSEHOLD_INCOME = [
  "Top 10%",
  "11-20%",
  "21-30%",
  "31-40%",
  "41-50%",
  "Lower 50%",
];

const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Chinese",
  "Japanese",
  "Korean",
];

export function TargetingOptions({ value, onChange }: TargetingOptionsProps) {
  const [newLocation, setNewLocation] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [newKeyword, setNewKeyword] = useState("");

  const handleAddLocation = () => {
    if (newLocation.trim()) {
      onChange({
        ...value,
        locations: [...(value.locations || []), newLocation.trim()],
      });
      setNewLocation("");
    }
  };

  const handleRemoveLocation = (location: string) => {
    onChange({
      ...value,
      locations: value.locations?.filter((l) => l !== location),
    });
  };

  const handleAddInterest = () => {
    if (newInterest.trim()) {
      onChange({
        ...value,
        interests: [...(value.interests || []), newInterest.trim()],
      });
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (interest: string) => {
    onChange({
      ...value,
      interests: value.interests?.filter((i) => i !== interest),
    });
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      onChange({
        ...value,
        keywords: [...(value.keywords || []), newKeyword.trim()],
      });
      setNewKeyword("");
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    onChange({
      ...value,
      keywords: value.keywords?.filter((k) => k !== keyword),
    });
  };

  const handleDemographicsChange = (
    category: "ageRanges" | "genders" | "parentalStatus" | "householdIncome",
    item: string
  ) => {
    const currentValues = value.demographics?.[category] || [];
    const newValues = currentValues.includes(item)
      ? currentValues.filter((v) => v !== item)
      : [...currentValues, item];

    onChange({
      ...value,
      demographics: {
        ...value.demographics,
        [category]: newValues,
      },
    });
  };

  const handleLanguageChange = (language: string) => {
    const currentLanguages = value.languages || [];
    const newLanguages = currentLanguages.includes(language)
      ? currentLanguages.filter((l) => l !== language)
      : [...currentLanguages, language];

    onChange({
      ...value,
      languages: newLanguages,
    });
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="locations">
        <AccordionTrigger>Locations</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Enter location"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddLocation()}
              />
              <Button onClick={handleAddLocation}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {value.locations?.map((location) => (
                <Badge
                  key={location}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {location}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0"
                    onClick={() => handleRemoveLocation(location)}
                  >
                    <Icons.x className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="languages">
        <AccordionTrigger>Languages</AccordionTrigger>
        <AccordionContent>
          <ScrollArea className="h-[200px] rounded-md border p-4">
            <div className="space-y-2">
              {LANGUAGES.map((language) => (
                <div key={language} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`language-${language}`}
                    checked={(value.languages || []).includes(language)}
                    onChange={() => handleLanguageChange(language)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <label htmlFor={`language-${language}`}>{language}</label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="demographics">
        <AccordionTrigger>Demographics</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 font-medium">Age Ranges</h4>
              <div className="flex flex-wrap gap-2">
                {AGE_RANGES.map((age) => (
                  <Badge
                    key={age}
                    variant={
                      value.demographics?.ageRanges?.includes(age)
                        ? "default"
                        : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => handleDemographicsChange("ageRanges", age)}
                  >
                    {age}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-2 font-medium">Gender</h4>
              <div className="flex flex-wrap gap-2">
                {GENDERS.map((gender) => (
                  <Badge
                    key={gender}
                    variant={
                      value.demographics?.genders?.includes(gender)
                        ? "default"
                        : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => handleDemographicsChange("genders", gender)}
                  >
                    {gender}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-2 font-medium">Parental Status</h4>
              <div className="flex flex-wrap gap-2">
                {PARENTAL_STATUS.map((status) => (
                  <Badge
                    key={status}
                    variant={
                      value.demographics?.parentalStatus?.includes(status)
                        ? "default"
                        : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() =>
                      handleDemographicsChange("parentalStatus", status)
                    }
                  >
                    {status}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-2 font-medium">Household Income</h4>
              <div className="flex flex-wrap gap-2">
                {HOUSEHOLD_INCOME.map((income) => (
                  <Badge
                    key={income}
                    variant={
                      value.demographics?.householdIncome?.includes(income)
                        ? "default"
                        : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() =>
                      handleDemographicsChange("householdIncome", income)
                    }
                  >
                    {income}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="interests">
        <AccordionTrigger>Interests</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Enter interest"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddInterest()}
              />
              <Button onClick={handleAddInterest}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {value.interests?.map((interest) => (
                <Badge
                  key={interest}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {interest}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0"
                    onClick={() => handleRemoveInterest(interest)}
                  >
                    <Icons.x className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="keywords">
        <AccordionTrigger>Keywords</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Enter keyword"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddKeyword()}
              />
              <Button onClick={handleAddKeyword}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {value.keywords?.map((keyword) => (
                <Badge
                  key={keyword}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {keyword}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0"
                    onClick={() => handleRemoveKeyword(keyword)}
                  >
                    <Icons.x className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
} 