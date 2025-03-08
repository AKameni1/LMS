'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Paperclip, Send } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(1, { message: 'Please select a subject.' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' })
    .max(1000, { message: 'Message cannot exceed 1000 characters.' }),
  file: z
    .any()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: `File size must be less than 5MB.`,
    })
    .refine((file) => !file || ACCEPTED_FILE_TYPES.includes(file.type), {
      message: 'File must be JPEG, PNG, PDF, or Word document.',
    })
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill with user data (in a real app, this would come from auth context)
  const defaultValues = {
    name: 'John Doe', // Example
    email: 'john.doe@university.edu', // Example
    subject: '',
    message: '',
    file: undefined,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Form submitted:', data);

      toast.success('Message sent successfully', {
        description:
          'A member of our library staff will respond to your inquiry soon.',
      });

      form.reset({
        ...defaultValues,
        subject: '',
        message: '',
        file: undefined,
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Error sending message', {
        description: 'Please try again later or contact us directly by phone.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} readOnly className="bg-dark-700" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} readOnly className="bg-dark-700" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="book-issue">
                    📚 Book Issue or Damage
                  </SelectItem>
                  <SelectItem value="extend-loan">
                    ⏱️ Extend Borrowing Period
                  </SelectItem>
                  <SelectItem value="reservation">
                    🔖 Book Reservation
                  </SelectItem>
                  <SelectItem value="book-request">
                    📝 Request New Book
                  </SelectItem>
                  <SelectItem value="technical">
                    💻 Technical Support
                  </SelectItem>
                  <SelectItem value="fine">💰 Fine or Payment Issue</SelectItem>
                  <SelectItem value="other">❓ Other Inquiry</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please provide details about your inquiry..."
                  className="min-h-[150px] resize-y bg-dark-700"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {form.watch('message').length}/1000 characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field: { onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Attachment (optional)</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    className="bg-dark-700"
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      onChange(file || undefined);
                    }}
                    {...fieldProps}
                  />
                  <Paperclip className="h-5 w-5 text-muted-foreground" />
                </div>
              </FormControl>
              <FormDescription>
                Max 5MB (JPEG, PNG, PDF, or Word)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>{' '}
              Sending...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Send Message
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
}
