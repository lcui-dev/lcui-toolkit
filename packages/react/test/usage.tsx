import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertAction,
  AlertContent,
  AlertDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertTitle,
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
  Badge,
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Empty,
  EmptyAction,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
  Icon,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupKbd,
  InputGroupText,
  InputGroupTextarea,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  Label,
  Link,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  Portal,
  Progress,
  ProgressLabel,
  ProgressValue,
  RadioGroup,
  RadioGroupItem,
  ScrollArea,
  ScrollAreaContent,
  Scrollbar,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Shimmer,
  ShimmerContent,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  Spinner,
  SpinnerContent,
  Text,
  TextInput,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  Widget,
  RouterLink,
  CType,
  useState,
  alertVariants,
  badgeVariants,
  buttonVariants,
  cardVariants,
  itemVariants,
} from "../src/index.js";

export default function Usage() {
  const [value] = useState(20, CType.Int);
  const [open] = useState(true);
  void [
    buttonVariants({ variant: "secondary", size: "sm" }),
    badgeVariants({ variant: "secondary", color: "blue" }),
    alertVariants({ variant: "success" }),
    itemVariants({ variant: "outline", size: "sm", interactive: true }),
    cardVariants({ size: "sm" }),
  ];

  return (
    <Widget>
      <Accordion defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Title</AccordionTrigger>
          <AccordionContent>Body</AccordionContent>
        </AccordionItem>
      </Accordion>
      <AlertDialogTrigger render={<Button variant="outline">Show Dialog</Button>} />
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <Portal>
          <DialogOverlay>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Title</DialogTitle>
                <DialogDescription>Description</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose>Cancel</DialogClose>
                <DialogClose />
              </DialogFooter>
            </DialogContent>
          </DialogOverlay>
        </Portal>
      </Dialog>
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <Label for="email">Email</Label>
      <TextInput id="email" defaultValue="a@b.c" />
      <InputGroupInput defaultValue="search" />
      <Progress value={value} />
      <Checkbox checked={open} />
      <Select defaultValue="apple">
        <SelectTrigger>
          <SelectValue placeholder="Fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
          </SelectGroup>
          <SelectSeparator />
        </SelectContent>
      </Select>
      <SidebarProvider defaultOpen={false}>
        <Sidebar collapsible="icon">
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton render={<a href="#" />}>Home</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
      <button variant="primary">Save</button>
      <accordion default-value="a" />
      <Accordion />
      <AccordionContent />
      <AccordionItem />
      <AccordionTrigger />
      <Alert />
      <AlertAction />
      <AlertContent />
      <AlertDescription />
      <AlertDialog />
      <AlertDialogAction />
      <AlertDialogCancel />
      <AlertDialogContent />
      <AlertDialogDescription />
      <AlertDialogFooter />
      <AlertDialogHeader />
      <AlertDialogMedia />
      <AlertDialogOverlay />
      <AlertDialogTitle />
      <AlertDialogTrigger />
      <AlertTitle />
      <Attachment />
      <AttachmentAction />
      <AttachmentActions />
      <AttachmentContent />
      <AttachmentDescription />
      <AttachmentGroup />
      <AttachmentMedia />
      <AttachmentTitle />
      <AttachmentTrigger />
      <Badge />
      <Breadcrumb />
      <BreadcrumbEllipsis />
      <BreadcrumbItem />
      <BreadcrumbLink />
      <BreadcrumbList />
      <BreadcrumbPage />
      <BreadcrumbSeparator />
      <Button />
      <ButtonGroup />
      <ButtonGroupSeparator />
      <ButtonGroupText />
      <Card />
      <CardAction />
      <CardContent />
      <CardDescription />
      <CardFooter />
      <CardHeader />
      <CardTitle />
      <Checkbox />
      <Collapsible />
      <CollapsibleContent />
      <CollapsibleTrigger />
      <Dialog />
      <DialogClose />
      <DialogContent />
      <DialogDescription />
      <DialogFooter />
      <DialogHeader />
      <DialogOverlay />
      <DialogTitle />
      <DialogTrigger />
      <DropdownMenu />
      <DropdownMenuCheckboxItem />
      <DropdownMenuContent />
      <DropdownMenuGroup />
      <DropdownMenuItem />
      <DropdownMenuLabel />
      <DropdownMenuRadioGroup />
      <DropdownMenuRadioItem />
      <DropdownMenuSeparator />
      <DropdownMenuShortcut />
      <DropdownMenuSub />
      <DropdownMenuSubContent />
      <DropdownMenuSubTrigger />
      <DropdownMenuTrigger />
      <Empty />
      <EmptyAction />
      <EmptyContent />
      <EmptyDescription />
      <EmptyHeader />
      <EmptyMedia />
      <EmptyTitle />
      <Field />
      <FieldContent />
      <FieldDescription />
      <FieldGroup />
      <FieldLabel />
      <FieldLegend />
      <FieldSeparator />
      <FieldSet />
      <FieldTitle />
      <Icon />
      <InputGroup />
      <InputGroupAddon />
      <InputGroupButton />
      <InputGroupInput />
      <InputGroupKbd />
      <InputGroupText />
      <InputGroupTextarea />
      <Item />
      <ItemActions />
      <ItemContent />
      <ItemDescription />
      <ItemMedia />
      <ItemTitle />
      <Label />
      <Link />
      <Popover />
      <PopoverContent />
      <PopoverDescription />
      <PopoverHeader />
      <PopoverTitle />
      <PopoverTrigger />
      <Portal />
      <Progress />
      <ProgressLabel />
      <ProgressValue />
      <RadioGroup />
      <RadioGroupItem />
      <ScrollArea />
      <ScrollAreaContent />
      <Scrollbar />
      <Select />
      <SelectContent />
      <SelectGroup />
      <SelectItem />
      <SelectLabel />
      <SelectSeparator />
      <SelectTrigger />
      <SelectValue />
      <Shimmer />
      <ShimmerContent />
      <Sidebar />
      <SidebarContent />
      <SidebarFooter />
      <SidebarGroup />
      <SidebarGroupAction />
      <SidebarGroupContent />
      <SidebarGroupLabel />
      <SidebarHeader />
      <SidebarMenu />
      <SidebarMenuAction />
      <SidebarMenuBadge />
      <SidebarMenuButton />
      <SidebarMenuItem />
      <SidebarMenuSub />
      <SidebarMenuSubButton />
      <SidebarMenuSubItem />
      <SidebarProvider />
      <SidebarRail />
      <SidebarTrigger />
      <Spinner />
      <SpinnerContent />
      <Text />
      <TextInput />
      <Tooltip />
      <TooltipContent />
      <TooltipTrigger />
      <Widget />
      <RouterLink to="/" />
    </Widget>
  );
}
