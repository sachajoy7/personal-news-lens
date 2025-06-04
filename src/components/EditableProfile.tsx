
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit2, Save, X } from 'lucide-react';

interface UserProfile {
  name: string;
  location: string;
  age: string;
  occupation: string;
  income: string;
  interests: string[];
}

interface EditableProfileProps {
  profile: UserProfile;
  onProfileUpdate: (profile: UserProfile) => void;
}

const EditableProfile = ({ profile, onProfileUpdate }: EditableProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [newInterest, setNewInterest] = useState('');

  const availableInterests = [
    'Housing', 'Technology', 'Environment', 'Politics', 'Economy', 'Health',
    'Education', 'Transport', 'Crime', 'Sports', 'Arts', 'Tourism'
  ];

  const incomeOptions = [
    'Low Income (Under 40k)',
    'Medium Income (40k - 100k)',
    'High Income (Over 100k)'
  ];

  const handleSave = () => {
    onProfileUpdate(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const addInterest = (interest: string) => {
    if (!editedProfile.interests.includes(interest)) {
      setEditedProfile({
        ...editedProfile,
        interests: [...editedProfile.interests, interest]
      });
    }
  };

  const removeInterest = (interest: string) => {
    setEditedProfile({
      ...editedProfile,
      interests: editedProfile.interests.filter(i => i !== interest)
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Your Profile</h2>
        {!isEditing ? (
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
            <Edit2 className="w-4 h-4 mr-2" />
            Edit
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              <X className="w-4 h-4" />
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Name</label>
          {isEditing ? (
            <input
              type="text"
              value={editedProfile.name}
              onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
              className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          ) : (
            <p className="text-gray-900">{profile.name}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Location</label>
          {isEditing ? (
            <input
              type="text"
              value={editedProfile.location}
              onChange={(e) => setEditedProfile({...editedProfile, location: e.target.value})}
              className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="text-gray-900">{profile.location}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Age</label>
          {isEditing ? (
            <input
              type="text"
              value={editedProfile.age}
              onChange={(e) => setEditedProfile({...editedProfile, age: e.target.value})}
              className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="text-gray-900">{profile.age}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Occupation</label>
          {isEditing ? (
            <input
              type="text"
              value={editedProfile.occupation}
              onChange={(e) => setEditedProfile({...editedProfile, occupation: e.target.value})}
              className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="text-gray-900">{profile.occupation}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Income Level</label>
          {isEditing ? (
            <Select 
              value={editedProfile.income} 
              onValueChange={(value) => setEditedProfile({...editedProfile, income: value})}
            >
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select income level" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                {incomeOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <p className="text-gray-900">{profile.income}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Interests</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {editedProfile.interests.map((interest) => (
              <Badge
                key={interest}
                variant="secondary"
                className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer"
                onClick={() => isEditing && removeInterest(interest)}
              >
                {interest}
                {isEditing && <X className="w-3 h-3 ml-1" />}
              </Badge>
            ))}
          </div>
          
          {isEditing && (
            <div>
              <p className="text-xs text-gray-500 mb-2">Add interests:</p>
              <div className="flex flex-wrap gap-2">
                {availableInterests
                  .filter(interest => !editedProfile.interests.includes(interest))
                  .map((interest) => (
                    <Badge
                      key={interest}
                      variant="outline"
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => addInterest(interest)}
                    >
                      + {interest}
                    </Badge>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditableProfile;
