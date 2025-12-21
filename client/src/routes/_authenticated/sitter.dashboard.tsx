import { createFileRoute } from "@tanstack/react-router"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"
import { MapPin, Loader2, Image as ImageIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useSitter, useCreateSitter } from "@/hooks/useSitter"
import { useUpload } from "@/hooks/useUpload"
import { Spinner } from "@/components/ui/spinner"
import { useState, useRef } from "react"

export const Route = createFileRoute("/_authenticated/sitter/dashboard")({
  component: RouteComponent,
})

const sitterFormSchema = z.object({
  phoneNumber: z.string().min(11, "Phone number must be at least 11 characters"),
  headline: z.string().min(5, "Headline must be at least 5 characters"),
  bio: z.string(),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  latitude: z.number(),
  longitude: z.number(),
  experienceYears: z.number().min(0),
  acceptsLargeDogs: z.boolean(),
  acceptsSmallDogs: z.boolean(),
  acceptsCats: z.boolean(),
  acceptsFish: z.boolean(),
  acceptsBirds: z.boolean(),
  acceptsOtherPets: z.boolean(),
  nidImage: z.string().min(1, "NID Image is required"),
})


function RouteComponent() {
  const { data: sitter, isPending: isSitterLoading } = useSitter()
  const createSitter = useCreateSitter()
  const upload = useUpload()
  const [isLocating, setIsLocating] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm({
    defaultValues: {
      phoneNumber: "",
      headline: "",
      bio: "",
      address: "",
      city: "",
      latitude: 0,
      longitude: 0,
      experienceYears: 0,
      acceptsLargeDogs: false,
      acceptsSmallDogs: false,
      acceptsCats: false,
      acceptsFish: false,
      acceptsBirds: false,
      acceptsOtherPets: false,
      nidImage: "",
    },
    validators: {
      onSubmit: sitterFormSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await createSitter.mutateAsync(value)
        toast.success("Profile created successfully!")
      } catch (error) {
        console.error("Submission failed:", error)
        toast.error("Failed to create profile")
      }
    },
  })

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    toast.promise(upload.mutateAsync(file), {
      loading: "Uploading NID Image...",
      success: (data) => {
        form.setFieldValue("nidImage", data.url)
        return "Image uploaded successfully!"
      },
      error: "Failed to upload image",
    })
  }


  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser")
      return
    }

    setIsLocating(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        form.setFieldValue("latitude", position.coords.latitude)
        form.setFieldValue("longitude", position.coords.longitude)
        setIsLocating(false)
        toast.success("Location updated!")
      },
      () => {
        setIsLocating(false)
        toast.error("Unable to retrieve your location")
      }
    )
  }

  if (isSitterLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (sitter) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Your Sitter Profile</CardTitle>
            <CardDescription>You are already registered as a pet sitter.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Display Name</p>
                <p>{sitter.displayName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                <p>{sitter.phoneNumber}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium text-muted-foreground">Headline</p>
                <p>{sitter.headline}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium text-muted-foreground">Bio</p>
                <p>{sitter.bio || "No bio provided"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Become a Pet Sitter</CardTitle>
          <CardDescription>Fill out the form below to register as a pet sitter on PawSit.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="sitter-form"
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
            className="space-y-6"
          >
            <FieldGroup>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Headline */}
                <form.Field
                  name="headline"
                  children={(field) => (
                    <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                      <FieldLabel htmlFor={field.name}>Headline</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="e.target.value Experienced dog walker in downtown"
                      />
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                />

                {/* Phone Number */}
                <form.Field
                  name="phoneNumber"
                  children={(field) => (
                    <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                      <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="+1 234 567 890"
                      />
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                />

                {/* Bio */}
                <div className="md:col-span-2">
                  <form.Field
                    name="bio"
                    children={(field) => (
                      <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                        <FieldLabel htmlFor={field.name}>Bio</FieldLabel>
                        <Textarea
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Tell us about yourself and your experience with pets..."
                        />
                        <FieldError errors={field.state.meta.errors} />
                      </Field>
                    )}
                  />
                </div>

                {/* Address */}
                <form.Field
                  name="address"
                  children={(field) => (
                    <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                      <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="123 Main St"
                      />
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                />

                {/* City */}
                <form.Field
                  name="city"
                  children={(field) => (
                    <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                      <FieldLabel htmlFor={field.name}>City</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="New York"
                      />
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                />

                {/* Location */}
                <div className="md:col-span-2 space-y-4">
                  <div className="flex items-end gap-4">
                    <form.Field
                      name="latitude"
                      children={(field) => (
                        <Field className="flex-1" data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                          <FieldLabel htmlFor={field.name}>Latitude</FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            type="number"
                            step="any"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(parseFloat(e.target.value))}
                          />
                        </Field>
                      )}
                    />
                    <form.Field
                      name="longitude"
                      children={(field) => (
                        <Field className="flex-1" data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                          <FieldLabel htmlFor={field.name}>Longitude</FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            type="number"
                            step="any"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(parseFloat(e.target.value))}
                          />
                        </Field>
                      )}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGetLocation}
                      disabled={isLocating}
                      className="mb-[2px]"
                    >
                      {isLocating ? <Loader2 className="animate-spin" /> : <MapPin />}
                      Get Location
                    </Button>
                  </div>
                </div>

                {/* Experience Years */}
                <form.Field
                  name="experienceYears"
                  children={(field) => (
                    <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                      <FieldLabel htmlFor={field.name}>Years of Experience</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="number"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(parseInt(e.target.value))}
                      />
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                />
                {/* NID Image */}
                <form.Field
                  name="nidImage"
                  children={(field) => (
                    <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                      <FieldLabel htmlFor={field.name}>NID Image</FieldLabel>
                      <div className="flex items-center gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={upload.isPending}
                        >
                          {upload.isPending ? <Loader2 className="animate-spin mr-2" /> : <ImageIcon className="mr-2" />}
                          {field.state.value ? "Change Image" : "Upload NID Image"}
                        </Button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                        {field.state.value && (
                          <div className="relative group">
                            <img
                              src={field.state.value}
                              alt="NID Preview"
                              className="h-20 w-32 object-cover rounded-lg border border-border"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs font-medium">Uploaded</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                />
              </div>

              {/* Pet Preferences */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">I accept:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { name: "acceptsSmallDogs", label: "Small Dogs" },
                    { name: "acceptsLargeDogs", label: "Large Dogs" },
                    { name: "acceptsCats", label: "Cats" },
                    { name: "acceptsFish", label: "Fish" },
                    { name: "acceptsBirds", label: "Birds" },
                    { name: "acceptsOtherPets", label: "Other Pets" },
                  ].map((pref) => (
                    <form.Field
                      key={pref.name}
                      name={pref.name as any}
                      children={(field) => (
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={field.state.value as boolean}
                            onChange={(e) => field.handleChange(e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <span className="text-sm">{pref.label}</span>
                        </label>
                      )}
                    />
                  ))}
                </div>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            form="sitter-form"
            className="w-full"
            disabled={createSitter.isPending}
          >
            {createSitter.isPending && <Loader2 className="animate-spin" />}
            Register as Sitter
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
