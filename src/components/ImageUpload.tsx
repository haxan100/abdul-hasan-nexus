import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { X, Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  accept?: string;
}

export default function ImageUpload({ label, value, onChange, accept = "image/*" }: ImageUploadProps) {
  const [preview, setPreview] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Store file for later upload
    setFile(selectedFile);
    
    // Show preview immediately
    const previewUrl = URL.createObjectURL(selectedFile);
    setPreview(previewUrl);
    onChange(previewUrl); // Pass preview URL to form
  };

  const handleRemove = () => {
    if (preview.startsWith('blob:')) {
      URL.revokeObjectURL(preview);
    }
    setPreview('');
    setFile(null);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const displayImage = preview || value;



  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      
      {displayImage ? (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden border bg-gray-100 flex items-center justify-center">
                  <img 
                    src={displayImage} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">Image ready</p>
                  <p className="text-xs text-muted-foreground">
                    {displayImage.startsWith('blob:') ? 'Preview only' : 'Saved'}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRemove}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div 
          className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center cursor-pointer hover:border-muted-foreground/50"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-2">
            Click to select image
          </p>
          <Button type="button" variant="outline">
            Choose File
          </Button>
        </div>
      )}
      
      <Input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}