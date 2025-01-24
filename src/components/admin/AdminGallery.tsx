import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export const AdminGallery = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const { toast } = useToast();

  const { data: images, refetch } = useQuery({
    queryKey: ["gallery_images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      toast({
        title: "Error",
        description: "Please select an image",
        variant: "destructive",
      });
      return;
    }

    try {
      const fileExt = image.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(fileName, image);
      if (uploadError) throw uploadError;

      const imageUrl = `${supabase.storage.from("gallery").getPublicUrl(fileName).data.publicUrl}`;

      const { error } = await supabase.from("gallery_images").insert({
        url: imageUrl,
        title,
        description,
      });
      if (error) throw error;

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
      setTitle("");
      setDescription("");
      setImage(null);
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          required
        />
        <Input
          placeholder="Image Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Image Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit">Upload Image</Button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images?.map((image) => (
          <div key={image.id} className="border rounded-lg p-4">
            <img src={image.url} alt={image.title || ""} className="w-full h-48 object-cover rounded" />
            <h4 className="font-semibold mt-2">{image.title}</h4>
            <p className="text-sm text-gray-600">{image.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};