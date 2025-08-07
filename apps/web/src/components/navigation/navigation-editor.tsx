"use client";

import { useState } from "react";
import { SiteNavigation, NavigationItem } from "@/lib/mock-data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Plus,
  GripVertical,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronRight,
  Save,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationEditorProps {
  navigation: SiteNavigation | undefined;
  siteId: string;
}

interface NavItemProps {
  item: NavigationItem;
  level: number;
  onUpdate: (item: NavigationItem) => void;
  onDelete: (itemId: string) => void;
}

function NavItem({ item, level, onUpdate, onDelete }: NavItemProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(item);

  const handleSave = () => {
    onUpdate(editingItem);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditingItem(item);
    setIsEditing(false);
  };

  return (
    <div className={cn("border-l-2 border-gray-200", level > 0 && "ml-6")}>
      <div className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg mb-2">
        <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />

        {item.children && item.children.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-0 h-auto"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        )}

        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-2">
              <Input
                value={editingItem.label}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, label: e.target.value })
                }
                className="h-8"
              />
              <Input
                value={editingItem.href}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, href: e.target.value })
                }
                className="h-8"
                placeholder="URL or path"
              />
              <div className="flex space-x-2">
                <Button size="sm" onClick={handleSave}>
                  Save
                </Button>
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="font-medium text-shortpoint-text-primary">
                {item.label}
              </div>
              <div className="text-sm text-shortpoint-text-subtle">
                {item.href}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(item.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Children */}
      {isExpanded && item.children && item.children.length > 0 && (
        <div className="ml-4">
          {item.children.map((child) => (
            <NavItem
              key={child.id}
              item={child}
              level={level + 1}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function NavigationEditor({
  navigation,
  siteId,
}: NavigationEditorProps) {
  const [navItems, setNavItems] = useState(navigation?.structure || []);
  const [newItemLabel, setNewItemLabel] = useState("");
  const [newItemHref, setNewItemHref] = useState("");

  const handleAddItem = () => {
    if (!newItemLabel.trim()) return;

    const newItem: NavigationItem = {
      id: `nav-item-${Date.now()}`,
      label: newItemLabel,
      href: newItemHref || "/",
      order: navItems.length + 1,
    };

    setNavItems([...navItems, newItem]);
    setNewItemLabel("");
    setNewItemHref("");
  };

  const handleUpdateItem = (updatedItem: NavigationItem) => {
    setNavItems((items) =>
      items.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleDeleteItem = (itemId: string) => {
    setNavItems((items) => items.filter((item) => item.id !== itemId));
  };

  const handleSaveNavigation = () => {
    // In a real app, this would save to the backend
    console.log("Saving navigation:", navItems);
  };

  return (
    <div className="space-y-6">
      {/* Live Preview */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-shortpoint-text-primary">
            Live Preview
          </h3>
        </CardHeader>
        <CardContent>
          <div className="bg-white border border-shortpoint-border-light rounded-lg p-4">
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <div key={item.id} className="relative group">
                  <span className="text-sm font-medium text-shortpoint-text-neutral cursor-pointer hover:text-shortpoint-primary">
                    {item.label}
                  </span>

                  {item.children && item.children.length > 0 && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-shortpoint-border-light rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-2">
                        {item.children.map((child) => (
                          <div
                            key={child.id}
                            className="block px-4 py-2 text-sm text-shortpoint-text-neutral hover:bg-shortpoint-light hover:text-shortpoint-primary"
                          >
                            {child.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Structure Editor */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="font-semibold text-shortpoint-text-primary">
            Navigation Structure
          </h3>
          <Button
            onClick={handleSaveNavigation}
            className="bg-shortpoint-primary hover:bg-shortpoint-primary/90 text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add New Item */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <h4 className="font-medium text-shortpoint-text-primary mb-3">
              Add Navigation Item
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="nav-label">Label</Label>
                <Input
                  id="nav-label"
                  value={newItemLabel}
                  onChange={(e) => setNewItemLabel(e.target.value)}
                  placeholder="Navigation label"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="nav-href">URL/Path</Label>
                <Input
                  id="nav-href"
                  value={newItemHref}
                  onChange={(e) => setNewItemHref(e.target.value)}
                  placeholder="/page-url"
                  className="mt-1"
                />
              </div>
            </div>
            <Button
              onClick={handleAddItem}
              disabled={!newItemLabel.trim()}
              className="mt-3"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>

          {/* Navigation Items */}
          <div className="space-y-2">
            {navItems.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                level={0}
                onUpdate={handleUpdateItem}
                onDelete={handleDeleteItem}
              />
            ))}

            {navItems.length === 0 && (
              <div className="text-center py-8 text-shortpoint-text-subtle">
                No navigation items configured. Add your first item above.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
