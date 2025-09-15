"use client";

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
import { BadgeDollarSign, CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useStateContext } from "@/context/StateProvider";
import { useSendTransaction } from "thirdweb/react";
import { toast } from "sonner";
import { prepareContractCall } from "thirdweb";
import { useNavigate } from "react-router-dom";

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
  const { mutate:sendTransaction } = useSendTransaction();
  const navigate = useNavigate(); 

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

  function onSubmit(values: z.infer<typeof formSchema>) {

    if(!contract || !address){
      console.error("contract or wallet missing");
      toast.error("contract or wallet address might be missing");

      return;
    }

    const transaction = prepareContractCall({
      contract,
      method: "function createCampaign(address,string,string,uint256,uint256,string) returns (uint256)",
      params: [
        address,
        values.title,
        values.description,
        BigInt(Math.floor(Number(values.target) * 10 ** 18)),

        BigInt(values.deadline.getTime()), // convert date to timestamp
        values.campaignImage,
      ],
    });
    sendTransaction(transaction, {
      onSuccess: () => {
        console.log("Campaign created successfully");
        toast.success("Campaign created successfully")
        form.reset(); // optional: reset form after success
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
        
        {/* Name + Title side by side */}
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

        {/* Description bigger */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter description"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="bg-[#8c6dfd] p-4 rounded-[10px] flex items-center gap-4">
          <BadgeDollarSign className="text-white animate-caret-blink"/>
          <h4 className="font-bold text-lg text-white">
            You will get 100% of the raised amount
          </h4>
        </div>

        {/* Target + Deadline side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="target"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Amount (ETH)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter target amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem className="flex flex-col">
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

        {/* Campaign Image URL */}
        <FormField
          control={form.control}
          name="campaignImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campaign Image URL</FormLabel>
              <FormControl>
                <Input type="url" placeholder="Enter image URL" {...field} />
              </FormControl>
              <FormMessage />
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Campaign Preview"
                  className="mt-2 max-w-xs rounded-md border"
                />
              )}
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Submitting..." : "Submit Campaign"}
        </Button>
      </form>
    </Form>
  );
}
