import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BadgeDollarSign, CalendarIcon, UploadCloudIcon, Loader2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useStateContext } from "@/context/StateProvider";
import { useSendTransaction } from "thirdweb/react";
import { resolveScheme, upload } from "thirdweb/storage"; // Only 'upload' is needed
import { client } from "../client";
import { toast } from "sonner";
import { prepareContractCall } from "thirdweb";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  target: z.string().min(1, "Target amount is required"),
  deadline: z.date({ required_error: "Deadline is required" }),
  campaignImage: z.string().url("Must be a valid image URL"),
});

export function CampaignForm() {
  const { contract, address } = useStateContext();
  const { mutate: sendTransaction } = useSendTransaction();
  const navigate = useNavigate();

  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      title: "",
      description: "",
      target: "",
      deadline: undefined,
      campaignImage: "",
    },
  });

  const imageUrl = form.watch("campaignImage");



  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setIsUploading(true);
      const toastId = toast.loading("Uploading image to IPFS...");
      try {
        // Upload returns a single ipfs://... string if one file
        const uris = await upload({
          client,
          files: acceptedFiles,
        });

        // Take the first string from the array
        // const ipfsUri = uris[0]; // "ipfs://Qm..."

        // console.log("Raw IPFS URI:", ipfsUri);

        // Convert ipfs://... into https://ipfs.thirdwebcdn.com/ipfs/...
        const httpUrl = resolveScheme({
          client,
          // @ts-ignore
          uri: uris,
        });


        console.log("Resolved HTTPS URL:", httpUrl);

        // Save the resolved URL into the form
        form.setValue("campaignImage", httpUrl, { shouldValidate: true });

        toast.success("Image uploaded successfully!", { id: toastId });
      } catch (error) {
        console.error("Image upload failed:", error);
        toast.error("Image upload failed.", { id: toastId });
      } finally {
        setIsUploading(false);
      }
    }
  }, [form]);


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.gif', '.webp'] },
    multiple: false,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!contract || !address) {
      console.error("contract or wallet missing");
      toast.error("contract or wallet address might be missing");
      return;
    }

    const transaction = prepareContractCall({
      contract,
      method: "function createCampaign(string,string,uint256,uint256,string) returns (uint256)",
      params: [
        values.title,
        values.description,
        BigInt(Math.floor(Number(values.target) * 10 ** 18)),
        BigInt(Math.floor(values.deadline.getTime() / 1000)),
        values.campaignImage,
      ],
    });

    sendTransaction(transaction, {
      onSuccess: () => {
        console.log("Campaign created successfully");
        toast.success("Campaign created successfully")
        form.reset();
        navigate("/main");
      },
      onError: (err) => {
        toast.error("Transaction failed")
        console.error("Transaction failed:", err);
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Campaign Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter campaign title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell your story..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="bg-[#8c6dfd] p-4 rounded-[10px] flex items-center gap-4">
          <BadgeDollarSign className="text-white" />
          <h4 className="font-bold text-lg text-white">
            You will get 100% of the raised amount
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="target"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Amount (ETH)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="0.50 ETH" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem className="flex flex-col pt-2">
                <FormLabel>Deadline</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? format(field.value, "PPP") : "Pick a date"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="campaignImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campaign Image URL</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="Paste an image URL or upload one below" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div {...getRootProps()} className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer",
              "hover:border-primary/60 transition-colors",
              isDragActive && "border-primary bg-primary/10"
            )}>
              <input {...getInputProps()} />
              {isUploading ? (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <p>Uploading...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <UploadCloudIcon className="h-8 w-8" />
                  {isDragActive ? <p>Drop the file here!</p> : <p>Drag 'n' drop an image here, or click to select</p>}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center pt-2">
            {imageUrl && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-center">Image Preview</p>
                <img
                  src={imageUrl}
                  alt="Campaign Preview"
                  className="w-full max-w-xs rounded-lg border aspect-video object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting || isUploading}>
          {form.formState.isSubmitting ? "Submitting Campaign..." : "Create Campaign"}
        </Button>
      </form>
    </Form>
  );
}