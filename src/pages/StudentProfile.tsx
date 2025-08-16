import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Upload, Edit2, Save, X, FileText, Download, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StudentProfile {
  email: string;
  first_name: string;
  last_name: string;
  age: string;
  qualification_level: string;
  avatar?: string;
}

interface ResultSheet {
  id: string;
  filename: string;
  uploadDate: string;
  extractedResults: {
    subject: string;
    grade: string;
    year: string;
  }[];
}

const StudentProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [editedProfile, setEditedProfile] = useState<StudentProfile | null>(null);
    const [resultSheets, setResultSheets] = useState<ResultSheet[]>([
    {
      id: "1",
      filename: "AL_Results_2023.pdf",
      uploadDate: "2024-01-15",
      extractedResults: [
        { subject: "Combined Mathematics", grade: "A", year: "2023" },
        { subject: "Physics", grade: "B", year: "2023" },
        { subject: "Chemistry", grade: "A", year: "2023" }
      ]
    }
  ]);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if (!token) {
      toast({
        title: "Unauthorized",
        description: "Please log in to access your profile.",
      });
      return;
    }

    axios.get("/api/student/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("Profile API response:", response.data);
      setProfile(response.data);
      setEditedProfile(response.data);
    })
    .catch((error) => {
      toast({
        title: "Error",
        description: "Failed to fetch profile information.",
      });
    });
  }, [toast]);

  if (!profile) {
    return <div className="text-center p-6">Loading profile...</div>;
  }


  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate file processing
      const newSheet: ResultSheet = {
        id: Date.now().toString(),
        filename: file.name,
        uploadDate: new Date().toISOString().split('T')[0],
        extractedResults: [
          { subject: "Mathematics", grade: "A", year: "2024" },
          { subject: "Science", grade: "B", year: "2024" }
        ]
      };
      setResultSheets([...resultSheets, newSheet]);
      toast({
        title: "File Uploaded",
        description: "Your result sheet has been uploaded and processed.",
      });
    }
  };

  const deleteResultSheet = (id: string) => {
    setResultSheets(resultSheets.filter(sheet => sheet.id !== id));
    toast({
      title: "Result Sheet Deleted",
      description: "The result sheet has been removed from your profile.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-primary text-white rounded-lg p-8 mb-8 shadow-elegant">
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-white/20">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback className="bg-white/20 text-white text-2xl font-bold">
                {profile.first_name[0]}{profile.last_name[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {profile.first_name} {profile.last_name}
              </h1>
              <p className="text-white/80 text-lg">{profile.email}</p>
              <Badge variant="secondary" className="mt-2">
                {profile.qualification_level} Student
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Personal Information */}
          <div className="lg:col-span-2">
            <Card className="shadow-elegant">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-primary">Personal Information</CardTitle>
                {!isEditing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancel}
                      className="gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSave}
                      className="gap-2 bg-gradient-primary"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">First Name</Label>
                    {isEditing ? (
                      <Input
                        id="first_name"
                        value={editedProfile.first_name}
                        onChange={(e) => setEditedProfile({
                          ...editedProfile,
                          first_name: e.target.value
                        })}
                      />
                    ) : (
                      <p className="p-2 bg-muted rounded-md">{profile.first_name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    {isEditing ? (
                      <Input
                        id="last_name"
                        value={editedProfile.last_name}
                        onChange={(e) => setEditedProfile({
                          ...editedProfile,
                          last_name: e.target.value
                        })}
                      />
                    ) : (
                      <p className="p-2 bg-muted rounded-md">{profile.last_name}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => setEditedProfile({
                        ...editedProfile,
                        email: e.target.value
                      })}
                    />
                  ) : (
                    <p className="p-2 bg-muted rounded-md">{profile.email}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    {isEditing ? (
                      <Input
                        id="age"
                        type="number"
                        value={editedProfile.age}
                        onChange={(e) => setEditedProfile({
                          ...editedProfile,
                          age: e.target.value
                        })}
                      />
                    ) : (
                      <p className="p-2 bg-muted rounded-md">{profile.age}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qualification_level">Qualification Level</Label>
                    {isEditing ? (
                      <Select
                        value={editedProfile.qualification_level}
                        onValueChange={(value) => setEditedProfile({
                          ...editedProfile,
                          qualification_level: value
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="O/L">O/L (Ordinary Level)</SelectItem>
                          <SelectItem value="A/L">A/L (Advanced Level)</SelectItem>
                          <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                          <SelectItem value="Graduate">Graduate</SelectItem>
                          <SelectItem value="Postgraduate">Postgraduate</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="p-2 bg-muted rounded-md">{profile.qualification_level}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* File Upload Section */}
          <div>
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-primary">Upload Result Sheets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload your result sheets (PDF, JPG, PNG)
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Label htmlFor="file-upload">
                    <Button variant="outline" className="cursor-pointer" asChild>
                      <span>Choose File</span>
                    </Button>
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Results Section */}
        <Card className="mt-8 shadow-elegant">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Academic Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {resultSheets.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No result sheets uploaded yet. Upload your first result sheet above.
              </p>
            ) : (
              <div className="space-y-6">
                {resultSheets.map((sheet, index) => (
                  <div key={sheet.id}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <div>
                          <h4 className="font-semibold">{sheet.filename}</h4>
                          <p className="text-sm text-muted-foreground">
                            Uploaded on {new Date(sheet.uploadDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteResultSheet(sheet.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <h5 className="font-medium mb-3">Extracted Results:</h5>
                      <div className="grid md:grid-cols-3 gap-3">
                        {sheet.extractedResults.map((result, resultIndex) => (
                          <div
                            key={resultIndex}
                            className="bg-card p-3 rounded-md border flex items-center justify-between"
                          >
                            <div>
                              <p className="font-medium text-sm">{result.subject}</p>
                              <p className="text-xs text-muted-foreground">{result.year}</p>
                            </div>
                            <Badge
                              variant={result.grade === 'A' ? 'default' : 'secondary'}
                              className={result.grade === 'A' ? 'bg-success' : ''}
                            >
                              {result.grade}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    {index < resultSheets.length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentProfile;