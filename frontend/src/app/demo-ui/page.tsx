// frontend/src/app/demo-ui/page.tsx
"use client"; // Indique que ce composant est un Client Component

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Toaster, toast } from "sonner"; // Sonner est maintenant la méthode recommandée pour les toasts
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  CommandShortcut,
} from "@/components/ui/command";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function UIDemoPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [sliderValue, setSliderValue] = useState([50]);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [progress, setProgress] = useState(13);

  // Fonction pour simuler la progression d'une barre
  useState(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  });

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 text-gray-900 p-8 sm:p-12 lg:p-16">
        <Toaster richColors position="top-right" />{" "}
        {/* Pour afficher les toasts */}
        <h1 className="text-5xl font-extrabold mb-12 text-center text-gray-800">
          Bibliothèque de Composants Prisme IA
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Boutons */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              1. Boutons
            </h2>
            <div className="flex flex-wrap gap-3">
              <Button>Par défaut</Button>
              <Button variant="secondary">Secondaire</Button>
              <Button variant="destructive">Destructif</Button>
              <Button variant="outline">Contour</Button>
              <Button variant="ghost">Fantôme</Button>
              <Button variant="link">Lien</Button>
              <Button disabled>Désactivé</Button>
              <Button onClick={() => toast.success("Bouton cliqué !")}>
                Clic pour Toast
              </Button>
            </div>
          </section>

          {/* Badges */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              2. Badges
            </h2>
            <div className="flex flex-wrap gap-2">
              <Badge>Défaut</Badge>
              <Badge variant="secondary">Secondaire</Badge>
              <Badge variant="destructive">Destructif</Badge>
              <Badge variant="outline">Contour</Badge>
            </div>
          </section>

          {/* Alertes */}
          <section className="bg-white p-6 rounded-lg shadow-lg col-span-full">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              3. Alertes
            </h2>
            <Alert className="mb-4">
              <AlertTitle>Titre d&apos;Alerte</AlertTitle>
              <AlertDescription>
                Ceci est un message d&apos;alerte informatif.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>Erreur !</AlertTitle>
              <AlertDescription>
                Une action critique a échoué. Veuillez vérifier.
              </AlertDescription>
            </Alert>
          </section>

          {/* Accordion */}
          <section className="bg-white p-6 rounded-lg shadow-lg col-span-full">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              4. Accordéon
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Est-ce accessible ?</AccordionTrigger>
                <AccordionContent>
                  Oui. Il est construit sur des primitives Radix UI.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Comment ça marche ?</AccordionTrigger>
                <AccordionContent>
                  Les composants sont des wrappers autour de Radix UI et de
                  Tailwind CSS.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Cartes */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              5. Cartes
            </h2>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Titre de la Carte</CardTitle>
                <CardDescription>
                  Description de la carte, pour donner plus de détails.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Ceci est le contenu de la carte. Vous pouvez y mettre du
                  texte, des images ou d&apos;autres éléments.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <span>Pied de carte</span>
                <Button variant="secondary">Action</Button>
              </CardFooter>
            </Card>
          </section>

          {/* Calendrier */}
          <section className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              6. Calendrier
            </h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border shadow"
            />
          </section>

          {/* Checkbox */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              7. Checkbox
            </h2>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={checkboxChecked}
                onCheckedChange={(checked) =>
                  setCheckboxChecked(checked === true)
                }
              />
              <Label htmlFor="terms">Accepter les termes et conditions</Label>
            </div>
          </section>

          {/* Dialog */}
          <section className="bg-white p-6 rounded-lg shadow-lg flex justify-center items-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 w-full text-center">
              8. Fenêtre de Dialogue
            </h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Ouvrir Dialogue</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Êtes-vous absolument sûr ?</DialogTitle>
                  <DialogDescription>
                    Cette action ne peut pas être annulée. Cela supprimera
                    définitivement vos données de nos serveurs.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </section>

          {/* Dropdown Menu */}
          <section className="bg-white p-6 rounded-lg shadow-lg flex justify-center items-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 w-full text-center">
              9. Menu Déroulant
            </h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Ouvrir</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profil</DropdownMenuItem>
                <DropdownMenuItem>Facturation</DropdownMenuItem>
                <DropdownMenuItem>Paramètres</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Déconnexion</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </section>

          {/* Input */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              10. Champ de Saisie
            </h2>
            <Input type="email" placeholder="Email" className="mb-2" />
            <Input type="password" placeholder="Mot de passe" disabled />
          </section>

          {/* Label */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              11. Étiquette (Label)
            </h2>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email2">Votre Email</Label>
              <Input type="email" id="email2" placeholder="Email" />
            </div>
          </section>

          {/* Popover */}
          <section className="bg-white p-6 rounded-lg shadow-lg flex justify-center items-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 w-full text-center">
              12. Popover
            </h2>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Ouvrir Popover</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <p className="text-sm">
                  Placez ici du contenu contextuel, comme des formulaires légers
                  ou des informations supplémentaires.
                </p>
              </PopoverContent>
            </Popover>
          </section>

          {/* Radio Group */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              13. Groupe de Radios
            </h2>
            <RadioGroup defaultValue="option-one">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one">Option Un</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two">Option Deux</Label>
              </div>
            </RadioGroup>
          </section>

          {/* Select */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              14. Sélecteur
            </h2>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sélectionner un fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apple">Pomme</SelectItem>
                <SelectItem value="banana">Banane</SelectItem>
                <SelectItem value="grape">Raisin</SelectItem>
              </SelectContent>
            </Select>
          </section>

          {/* Separator */}
          <section className="bg-white p-6 rounded-lg shadow-lg col-span-full">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              15. Séparateur
            </h2>
            <div className="space-y-1">
              <h4 className="text-sm font-medium leading-none">
                Projet Prisme IA
              </h4>
              <p className="text-sm text-muted-foreground">
                Paramètres de l&apos;application
              </p>
            </div>
            <Separator className="my-4" />
            <div className="flex h-5 items-center space-x-4 text-sm">
              <div>Tableau de bord</div>
              <Separator orientation="vertical" />
              <div>Historique</div>
              <Separator orientation="vertical" />
              <div>Abonnement</div>
            </div>
          </section>

          {/* Sheet (Côté) */}
          <section className="bg-white p-6 rounded-lg shadow-lg flex justify-center items-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 w-full text-center">
              16. Panneau Latéral (Sheet)
            </h2>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Ouvrir Panneau</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Modifier le Profil</SheetTitle>
                  <SheetDescription>
                    Apporte des modifications à ton profil ici. Clique sur
                    enregistrer quand tu as terminé.
                  </SheetDescription>
                </SheetHeader>
                {/* Ici, tu mettrais un formulaire par exemple */}
                <div className="grid gap-4 py-4">
                  <Input id="name" value="Ton Nom" className="col-span-3" />
                  <Input
                    id="username"
                    value="@ton_pseudo"
                    className="col-span-3"
                  />
                </div>
              </SheetContent>
            </Sheet>
          </section>

          {/* Slider */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              17. Slider
            </h2>
            <Slider
              defaultValue={[50]}
              max={100}
              step={1}
              onValueChange={setSliderValue}
              className="w-[60%]"
            />
            <span className="ml-4 text-sm text-gray-600">{sliderValue}%</span>
          </section>

          {/* Switch */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              18. Switch
            </h2>
            <div className="flex items-center space-x-2">
              <Switch
                id="airplane-mode"
                checked={switchChecked}
                onCheckedChange={setSwitchChecked}
              />
              <Label htmlFor="airplane-mode">Mode Avion</Label>
            </div>
          </section>

          {/* Textarea */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              19. Zone de Texte
            </h2>
            <Textarea
              placeholder="Tapez votre message ici."
              className="resize-y"
            />
          </section>

          {/* Toggle */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              20. Toggle
            </h2>
            <Toggle aria-label="Toggle bold">B</Toggle>
            <Toggle aria-label="Toggle italic">I</Toggle>
            <Toggle aria-label="Toggle underline">U</Toggle>
          </section>

          {/* Tooltip */}
          <section className="bg-white p-6 rounded-lg shadow-lg flex justify-center items-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 w-full text-center">
              21. Infobulle (Tooltip)
            </h2>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button variant="outline">Passez la souris</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ceci est une infobulle !</p>
              </TooltipContent>
            </Tooltip>
          </section>

          {/* Hover Card */}
          <section className="bg-white p-6 rounded-lg shadow-lg flex justify-center items-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 w-full text-center">
              22. Carte au survol
            </h2>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link">Passez la souris sur moi</Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <p>
                  Ceci est une carte de survol. Elle peut afficher des
                  informations détaillées lorsque l&apos;utilisateur survole un
                  élément.
                </p>
              </HoverCardContent>
            </HoverCard>
          </section>

          {/* Progress */}
          <section className="bg-white p-6 rounded-lg shadow-lg col-span-full">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              23. Barre de Progression
            </h2>
            <Progress value={progress} className="w-[60%]" />
            <span className="ml-4 text-sm text-gray-600">{progress}%</span>
          </section>

          {/* Scroll Area */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              24. Zone de Défilement
            </h2>
            <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
              <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
                {Array.from({ length: 50 }).map((_, i) => (
                  <div key={i} className="text-sm">
                    Tag {i + 1}
                    <Separator className="my-2" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </section>

          {/* Skeleton */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              25. Squelette de chargement
            </h2>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </section>

          {/* Table */}
          <section className="bg-white p-6 rounded-lg shadow-lg col-span-full">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              26. Tableau
            </h2>
            <Table>
              <TableCaption>Une liste de vos récentes factures.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Facture</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Méthode</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Payé</TableCell>
                  <TableCell>Carte de crédit</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV002</TableCell>
                  <TableCell>En attente</TableCell>
                  <TableCell>PayPal</TableCell>
                  <TableCell className="text-right">$150.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </section>

          {/* Tabs */}
          <section className="bg-white p-6 rounded-lg shadow-lg col-span-full">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              27. Onglets
            </h2>
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Compte</TabsTrigger>
                <TabsTrigger value="password">Mot de passe</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="p-4">
                <p>Modifier les paramètres de votre compte ici.</p>
              </TabsContent>
              <TabsContent value="password" className="p-4">
                <p>Modifier votre mot de passe ici.</p>
              </TabsContent>
            </Tabs>
          </section>

          {/* Command (Recherche) */}
          <section className="bg-white p-6 rounded-lg shadow-lg col-span-full">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              28. Barre de Commande / Recherche
            </h2>
            <Command className="rounded-lg border shadow-md">
              <CommandInput placeholder="Rechercher des commandes..." />
              <CommandList>
                <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem>Profil</CommandItem>
                  <CommandItem>Facturation</CommandItem>
                  <CommandItem>Paramètres</CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Actions">
                  <CommandItem>Déconnexion</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </section>

          {/* Alert Dialog (Modale de Confirmation) */}
          <section className="bg-white p-6 rounded-lg shadow-lg flex justify-center items-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 w-full text-center">
              29. Boîte de Dialogue d&apos;Alerte
            </h2>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Supprimer le Compte</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Êtes-vous absolument sûr ?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action ne peut pas être annulée. Cela supprimera
                    définitivement votre compte et toutes les données associées
                    de nos serveurs.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction>Continuer</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </section>

          {/* Carousel */}
          <section className="bg-white p-6 rounded-lg shadow-lg col-span-full">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              30. Carousel
            </h2>
            <Carousel className="w-full max-w-sm mx-auto">
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="flex justify-center items-center bg-gray-100 h-32 rounded-md"
                  >
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>

          {/* Pagination */}
          <section className="bg-white p-6 rounded-lg shadow-lg col-span-full">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              31. Pagination
            </h2>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </section>
        </div>
        {/* Section Palette de Couleurs */}
        <section className="bg-white p-6 rounded-lg shadow-lg col-span-full">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            33. Palette de Couleurs (Slate)
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Ces couleurs sont définies via les variables CSS de shadcn/ui,
            basées sur la palette Slate.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* Couleurs de base */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-lg bg-background border shadow-md flex items-center justify-center text-center">
                <span className="text-xs text-foreground">Background</span>
              </div>
              <span className="text-sm mt-1 text-gray-700">
                `bg-background`
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-lg bg-foreground border shadow-md flex items-center justify-center text-center">
                <span className="text-xs text-background">Foreground</span>
              </div>
              <span className="text-sm mt-1 text-gray-700">
                `bg-foreground`
              </span>
            </div>

            {/* Couleurs primaires */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-lg bg-primary border shadow-md flex items-center justify-center text-center">
                <span className="text-xs text-primary-foreground">Primary</span>
              </div>
              <span className="text-sm mt-1 text-gray-700">`bg-primary`</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-lg bg-primary-foreground border shadow-md flex items-center justify-center text-center">
                <span className="text-xs text-primary">Primary Foreground</span>
              </div>
              <span className="text-sm mt-1 text-gray-700">
                `bg-primary-foreground`
              </span>
            </div>

            {/* Couleurs secondaires */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-lg bg-secondary border shadow-md flex items-center justify-center text-center">
                <span className="text-xs text-secondary-foreground">
                  Secondary
                </span>
              </div>
              <span className="text-sm mt-1 text-gray-700">`bg-secondary`</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-lg bg-secondary-foreground border shadow-md flex items-center justify-center text-center">
                <span className="text-xs text-secondary">
                  Secondary Foreground
                </span>
              </div>
              <span className="text-sm mt-1 text-gray-700">
                `bg-secondary-foreground`
              </span>
            </div>

            {/* Couleurs muted */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-lg bg-muted border shadow-md flex items-center justify-center text-center">
                <span className="text-xs text-muted-foreground">Muted</span>
              </div>
              <span className="text-sm mt-1 text-gray-700">`bg-muted`</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-lg bg-muted-foreground border shadow-md flex items-center justify-center text-center">
                <span className="text-xs text-muted">Muted Foreground</span>
              </div>
              <span className="text-sm mt-1 text-gray-700">
                `bg-muted-foreground`
              </span>
            </div>

            {/* Couleurs accent */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-lg bg-accent border shadow-md flex items-center justify-center text-center">
                <span className="text-xs text-accent-foreground">Accent</span>
              </div>
              <span className="text-sm mt-1 text-gray-700">`bg-accent`</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-lg bg-accent-foreground border shadow-md flex items-center justify-center text-center">
                <span className="text-xs text-accent">Accent Foreground</span>
              </div>
              <span className="text-sm mt-1 text-gray-700">
                `bg-accent-foreground`
              </span>
            </div>

            {/* Couleurs destructives */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-lg bg-destructive border shadow-md flex items-center justify-center text-center">
                <span className="text-xs text-destructive-foreground">
                  Destructive
                </span>
              </div>
              <span className="text-sm mt-1 text-gray-700">
                `bg-destructive`
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-lg bg-destructive-foreground border shadow-md flex items-center justify-center text-center">
                <span className="text-xs text-destructive">
                  Destructive Foreground
                </span>
              </div>
              <span className="text-sm mt-1 text-gray-700">
                `bg-destructive-foreground`
              </span>
            </div>

            {/* Couleurs des composants */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-lg bg-card border shadow-md flex items-center justify-center text-center">
                <span className="text-xs text-card-foreground">Card</span>
              </div>
              <span className="text-sm mt-1 text-gray-700">`bg-card`</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-lg bg-card-foreground border shadow-md flex items-center justify-center text-center">
                <span className="text-xs text-card">Card Foreground</span>
              </div>
              <span className="text-sm mt-1 text-gray-700">
                `bg-card-foreground`
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-lg bg-popover border shadow-md flex items-center justify-center text-center">
                <span className="text-xs text-popover-foreground">Popover</span>
              </div>
              <span className="text-sm mt-1 text-gray-700">`bg-popover`</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-lg bg-popover-foreground border shadow-md flex items-center justify-center text-center">
                <span className="text-xs text-popover">Popover Foreground</span>
              </div>
              <span className="text-sm mt-1 text-gray-700">
                `bg-popover-foreground`
              </span>
            </div>

            {/* Couleurs des bordures et inputs */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-lg bg-border border shadow-md flex items-center justify-center text-center">
                <span className="text-xs text-gray-700">Border</span>
              </div>
              <span className="text-sm mt-1 text-gray-700">`bg-border`</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-lg bg-input border shadow-md flex items-center justify-center text-center">
                <span className="text-xs text-gray-700">Input</span>
              </div>
              <span className="text-sm mt-1 text-gray-700">`bg-input`</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-lg bg-ring border shadow-md flex items-center justify-center text-center">
                <span className="text-xs text-gray-700">Ring</span>
              </div>
              <span className="text-sm mt-1 text-gray-700">`bg-ring`</span>
            </div>
          </div>
        </section>
        <p className="text-sm text-gray-500 mt-12 text-center">
          Démonstration complète des composants shadcn/ui. Niveau graphisme on
          peut maintenant visualiser l&apos;ensemble des éléments disponibles
          pour la conception de l&apos;interface.
        </p>
      </div>
    </TooltipProvider>
  );
}
