import { ArrowLeft, Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-4 md:p-8">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-8 flex flex-col items-center space-y-2 text-center">
          <div className="relative mb-4">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary-admin to-primary-admin/50 opacity-75 blur-xl"></div>
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-background shadow-lg">
              <span className="font-mono text-4xl font-bold">404</span>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Page not found
          </h1>
          <p className="max-w-[42rem] text-muted-foreground sm:text-xl">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It
            might have been moved, deleted, or never existed.
          </p>
        </div>

        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="search">Search</TabsTrigger>
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            <TabsTrigger value="report">Report</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="mt-4 space-y-4">
            <div className="mx-auto flex w-full max-w-lg items-center space-x-2">
              <Input
                type="text"
                placeholder="Search for content..."
                className="h-10"
              />
              <Button
                type="submit"
                size="icon"
                className="h-10 w-10 bg-primary-admin transition-all duration-200 hover:bg-primary-admin/90"
              >
                <Search className="h-4 w-4" color="white" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="suggestions" className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <SuggestionCard
                title="Documentation"
                description="Browse our comprehensive documentation to find what you need."
                href="#"
              />
              <SuggestionCard
                title="Blog"
                description="Read our latest articles and stay up to date with our news."
                href="#"
              />
              <SuggestionCard
                title="Products"
                description="Explore our products and services offerings."
                href="#"
              />
              <SuggestionCard
                title="Contact"
                description="Get in touch with our support team for assistance."
                href="#"
              />
            </div>
          </TabsContent>

          <TabsContent value="report" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Report this broken link</CardTitle>
                <CardDescription>
                  Help us improve by reporting how you encountered this page.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="url" className="text-sm font-medium">
                      URL you were trying to access
                    </label>
                    <Input id="url" placeholder="https://example.com/page" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="referrer" className="text-sm font-medium">
                      Where did you find this link?
                    </label>
                    <Input id="referrer" placeholder="Website, email, etc." />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Submit Report</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button
            variant="outline"
            size="lg"
            className="w-full bg-light-300 transition-all duration-200 hover:bg-light-400 sm:w-auto"
            asChild
          >
            <Link href="javascript:history.back()">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full bg-primary-admin text-white transition-all duration-200 hover:bg-primary-admin/90 sm:w-auto"
            asChild
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="mt-12 hidden animate-bounce text-center text-sm text-muted-foreground md:block">
          <p>Lost in digital space? Scroll down for an adventure!</p>
          <div className="mt-2 text-2xl">↓</div>
        </div>

        <div className="mt-24 hidden md:block">
          <NotFoundAnimation />
        </div>
      </div>
    </div>
  );
}

function SuggestionCard({
  title,
  description,
  href,
}: Readonly<{ title: string; description: string; href: string }>) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" asChild className="w-full justify-start">
          <Link href={href}>
            <ArrowLeft className="mr-2 h-4 w-4 rotate-180" />
            Visit {title}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function NotFoundAnimation() {
  return (
    <div className="relative h-64 w-full overflow-hidden rounded-lg border bg-background p-6">
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <div className="grid h-full w-full grid-cols-12 gap-2">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i + 1}
              className="col-span-1 h-full w-full animate-pulse rounded bg-foreground/10"
              style={{
                animationDelay: `${i * 0.05}s`,
                animationDuration: '1.5s',
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center space-y-4 text-center">
        <div className="text-4xl font-bold">
          <span
            className="inline-block animate-bounce"
            style={{ animationDelay: '0.1s' }}
          >
            4
          </span>
          <span
            className="inline-block animate-bounce"
            style={{ animationDelay: '0.2s' }}
          >
            0
          </span>
          <span
            className="inline-block animate-bounce"
            style={{ animationDelay: '0.3s' }}
          >
            4
          </span>
        </div>
        <p className="max-w-md text-muted-foreground">
          The page you&apos;re looking for is lost in the digital void, but your
          journey doesn&apos;t have to end here.
        </p>
        <div className="flex space-x-2">
          <span className="inline-block h-2 w-2 animate-ping rounded-full bg-primary-admin"></span>
          <span
            className="inline-block h-2 w-2 animate-ping rounded-full bg-primary-admin"
            style={{ animationDelay: '0.2s' }}
          ></span>
          <span
            className="inline-block h-2 w-2 animate-ping rounded-full bg-primary-admin"
            style={{ animationDelay: '0.4s' }}
          ></span>
        </div>
      </div>
    </div>
  );
}
