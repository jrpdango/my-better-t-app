"use client";

import { useState } from "react";
import { Theme } from "@/lib/mock-data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Palette, Eye } from "lucide-react";

interface ThemeEditorProps {
  theme: Theme | undefined;
  siteId: string;
}

const colorPresets = [
  { name: "ShortPoint Blue", primary: "#3161D1", secondary: "#5774a8" },
  { name: "Ocean", primary: "#0077be", secondary: "#4a90b8" },
  { name: "Forest", primary: "#2d5a27", secondary: "#5a8a52" },
  { name: "Sunset", primary: "#ff6b35", secondary: "#ff8c69" },
  { name: "Purple", primary: "#6366f1", secondary: "#8b5cf6" },
  { name: "Emerald", primary: "#10b981", secondary: "#34d399" },
];

export function ThemeEditor({ theme, siteId }: ThemeEditorProps) {
  const [currentTheme, setCurrentTheme] = useState(
    theme || {
      id: "new-theme",
      siteId,
      tenantId: "tenant-1",
      primaryColor: "#3161D1",
      secondaryColor: "#5774a8",
      customCss: "",
      updatedAt: new Date().toISOString(),
    }
  );

  const handleColorChange = (
    colorType: "primaryColor" | "secondaryColor",
    value: string
  ) => {
    setCurrentTheme((prev) => ({
      ...prev,
      [colorType]: value,
    }));
  };

  const handlePresetSelect = (preset: (typeof colorPresets)[0]) => {
    setCurrentTheme((prev) => ({
      ...prev,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
    }));
  };

  const handleSave = () => {
    console.log("Saving theme:", currentTheme);
    // In a real app, this would save to the backend
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Theme Controls */}
      <div className="space-y-6">
        {/* Color Presets */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-shortpoint-text-primary">
              Color Presets
            </h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {colorPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handlePresetSelect(preset)}
                  className="flex items-center space-x-3 p-3 border border-shortpoint-border-light rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex space-x-1">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: preset.primary }}
                    />
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: preset.secondary }}
                    />
                  </div>
                  <span className="text-sm font-medium text-shortpoint-text-primary">
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Custom Colors */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-shortpoint-text-primary">
              Custom Colors
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="primary-color">Primary Color</Label>
              <div className="flex items-center space-x-3 mt-2">
                <Input
                  id="primary-color"
                  type="color"
                  value={currentTheme.primaryColor}
                  onChange={(e) =>
                    handleColorChange("primaryColor", e.target.value)
                  }
                  className="w-16 h-10 p-1 border border-shortpoint-border-light rounded"
                />
                <Input
                  value={currentTheme.primaryColor}
                  onChange={(e) =>
                    handleColorChange("primaryColor", e.target.value)
                  }
                  placeholder="#3161D1"
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="secondary-color">Secondary Color</Label>
              <div className="flex items-center space-x-3 mt-2">
                <Input
                  id="secondary-color"
                  type="color"
                  value={currentTheme.secondaryColor}
                  onChange={(e) =>
                    handleColorChange("secondaryColor", e.target.value)
                  }
                  className="w-16 h-10 p-1 border border-shortpoint-border-light rounded"
                />
                <Input
                  value={currentTheme.secondaryColor}
                  onChange={(e) =>
                    handleColorChange("secondaryColor", e.target.value)
                  }
                  placeholder="#5774a8"
                  className="flex-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Custom CSS */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-shortpoint-text-primary">
              Custom CSS
            </h3>
          </CardHeader>
          <CardContent>
            <Label htmlFor="custom-css">Additional CSS Rules</Label>
            <textarea
              id="custom-css"
              value={currentTheme.customCss}
              onChange={(e) =>
                setCurrentTheme((prev) => ({
                  ...prev,
                  customCss: e.target.value,
                }))
              }
              placeholder="/* Add custom CSS here */&#10;.custom-class {&#10;  /* Your styles */&#10;}"
              className="w-full h-32 p-3 mt-2 border border-shortpoint-border-light rounded-lg font-mono text-sm resize-none"
            />
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex space-x-3">
          <Button
            onClick={handleSave}
            className="bg-shortpoint-primary hover:bg-shortpoint-primary/90 text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Theme
          </Button>
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview Changes
          </Button>
        </div>
      </div>

      {/* Live Preview */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-shortpoint-text-primary">
              Live Preview
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Navigation Preview */}
              <div className="border border-shortpoint-border-light rounded-lg p-4">
                <h4 className="text-sm font-medium text-shortpoint-text-primary mb-3">
                  Navigation Bar
                </h4>
                <div
                  className="bg-white border border-shortpoint-border-light rounded-lg p-3"
                  style={{ borderColor: currentTheme.primaryColor + "20" }}
                >
                  <div className="flex items-center space-x-6">
                    <span
                      className="text-sm font-medium cursor-pointer"
                      style={{ color: currentTheme.primaryColor }}
                    >
                      Home
                    </span>
                    <span
                      className="text-sm font-medium cursor-pointer"
                      style={{ color: currentTheme.secondaryColor }}
                    >
                      About
                    </span>
                    <span
                      className="text-sm font-medium cursor-pointer"
                      style={{ color: currentTheme.secondaryColor }}
                    >
                      Services
                    </span>
                    <span
                      className="text-sm font-medium cursor-pointer"
                      style={{ color: currentTheme.secondaryColor }}
                    >
                      Contact
                    </span>
                  </div>
                </div>
              </div>

              {/* Button Preview */}
              <div className="border border-shortpoint-border-light rounded-lg p-4">
                <h4 className="text-sm font-medium text-shortpoint-text-primary mb-3">
                  Buttons
                </h4>
                <div className="flex items-center space-x-3">
                  <button
                    className="px-4 py-2 rounded-lg text-white font-medium text-sm"
                    style={{ backgroundColor: currentTheme.primaryColor }}
                  >
                    Primary Button
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg border font-medium text-sm"
                    style={{
                      borderColor: currentTheme.primaryColor,
                      color: currentTheme.primaryColor,
                    }}
                  >
                    Secondary Button
                  </button>
                </div>
              </div>

              {/* Content Preview */}
              <div className="border border-shortpoint-border-light rounded-lg p-4">
                <h4 className="text-sm font-medium text-shortpoint-text-primary mb-3">
                  Content
                </h4>
                <div className="space-y-2">
                  <h5
                    className="font-semibold"
                    style={{ color: currentTheme.primaryColor }}
                  >
                    Sample Heading
                  </h5>
                  <p
                    className="text-sm"
                    style={{ color: currentTheme.secondaryColor }}
                  >
                    This is a sample paragraph showing how your content will
                    look with the selected colors. The text uses your secondary
                    color for better readability.
                  </p>
                  <a
                    href="#"
                    className="text-sm underline"
                    style={{ color: currentTheme.primaryColor }}
                  >
                    Sample Link
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
