# Classroom Hub Device Setup Guide

Use this guide when you are physically setting up the Classroom Hub device.

You are working on the local setup page:

```text
http://rosehub.local/setup
```

This guide is only for the device setup work: power, hotspot, Wi-Fi, pairing, and downloading files. Use the [Educator Dashboard Guide](./educator-dashboard-guide.md) for accounts, classrooms, lessons, and sync management.

## What You Need

- Classroom Hub device
- Wall charger or charged battery pack
- Tablet, phone, or laptop
- Internet Wi-Fi for setup and downloading lessons
- Educator Dashboard account already created, or an educator ready to create one at `rosepch.org`

> Picture to add: photo of the Classroom Hub device, charger, optional battery pack, and a tablet/laptop.

## Step 1: Power On The Classroom Hub

The Classroom Hub can use wall power or a battery pack.

### Wall Charger

1. Plug the power cable into the Classroom Hub.
2. Plug the charger into the wall.
3. Wait about 1 minute for the hub to start.
4. Look for the setup Wi-Fi network on your tablet, phone, or laptop.

### Battery Pack

1. Make sure the battery pack is charged.
2. Plug the Classroom Hub power cable into the battery pack.
3. Turn on the battery pack if it has a power button.
4. Wait about 1 minute for the hub to start.
5. Keep the battery pack connected while teaching.

> Picture to add: close-up photo of the Classroom Hub powered by a charger and another photo powered by a battery pack.

## Step 2: Join The Hub Setup Hotspot

When the hub is not yet connected to internet Wi-Fi, it creates a temporary setup network.

The network name looks like:

```text
Rose-Setup-XXXX
```

The setup hotspot password is:

```text
rosehub1
```

1. Open Wi-Fi settings on your tablet, phone, or laptop.
2. Choose the `Rose-Setup-XXXX` network.
3. Enter the password `rosehub1`.
4. Wait for your device to connect.

> Picture to add: screenshot of Wi-Fi settings showing a `Rose-Setup-XXXX` network.

## Step 3: Open Classroom Hub Device Setup

After joining the setup hotspot, the setup page may open automatically.

If it does not open:

1. Open a browser.
2. Go to:

```text
http://rosehub.local/setup
```

3. Follow the setup page.

> Picture to add: screenshot of the first Classroom Hub Device Setup screen.

## Step 4: Connect The Hub To Internet Wi-Fi

The hub needs internet during setup and when downloading new lessons.

1. On the setup page, choose the internet Wi-Fi network the hub should use.
2. Enter the Wi-Fi password.
3. Submit the form.
4. Wait about 1 minute.
5. Reconnect your tablet, phone, or laptop to the same internet Wi-Fi network.
6. Open:

```text
http://rosehub.local/setup
```

If the hub cannot connect to internet Wi-Fi, it will return to the `Rose-Setup-XXXX` hotspot so you can try again.

> Picture to add: screenshot of the Wi-Fi selection screen on the setup page.

## Step 5: Show The Pairing Code

After the hub is online, the setup page shows a one-time pairing code.

This code is entered in the Educator Dashboard at `rosepch.org`.

1. Keep the setup page open.
2. Find the pairing code on the page.
3. Give the pairing code to the educator using the Educator Dashboard.
4. Wait on this page while the educator links the hub.

The setup page checks automatically. When the hub is linked, it will move to the next step.

> Picture to add: screenshot of the pairing code on the hub setup page.

## Step 6: Download Latest Files

After the hub is linked, the educator creates classrooms and lessons in the Educator Dashboard.

When lessons are ready for the hub:

1. Keep the Classroom Hub powered on.
2. Make sure it is connected to internet Wi-Fi.
3. On the setup page, choose **Download latest files**.
4. Wait until the page says the Student Library is ready.

> Picture to add: screenshot of the download/latest files step.

## Step 7: Open The Student Library

When setup is complete, students use the Student Library.

Student address:

```text
http://rosehub.local/join
```

Students will need the classroom join code from the educator.

> Picture to add: screenshot of the Student Library join page.

## Troubleshooting

### I Cannot See `Rose-Setup-XXXX`

- Wait 1 minute after plugging in the hub.
- Move closer to the hub.
- Turn Wi-Fi off and on again on your tablet, phone, or laptop.
- Restart the hub by unplugging power, waiting 10 seconds, and plugging it back in.

### The Setup Page Does Not Open

- Make sure you are connected to the `Rose-Setup-XXXX` Wi-Fi network first.
- Open a browser and type `http://rosehub.local/setup`.
- If that does not work, try again after restarting the hub.

### The Hub Will Not Connect To Internet Wi-Fi

- Check the Wi-Fi password.
- Choose the correct network name.
- Move the hub closer to the router.
- Try again from the setup page.

Some Wi-Fi networks that require a separate agreement page may not work with the hub.

### The Hub Does Not Show As Linked

- Make sure the hub has internet.
- Make sure the educator entered the pairing code in the Educator Dashboard.
- Keep the setup page open for a few seconds; it checks automatically.
- If needed, choose **Check status**.

### Students Cannot Open The Student Library

- Make sure the Classroom Hub is powered on.
- Make sure students are connected to the hub Wi-Fi network.
- Make sure students open `http://rosehub.local/join`.
- Make sure students have the correct classroom join code.

## Device Setup Checklist

- [ ] Classroom Hub is powered on
- [ ] Tablet/phone/laptop joined the setup hotspot
- [ ] Hub connected to internet Wi-Fi
- [ ] Pairing code was shown
- [ ] Hub was linked in the Educator Dashboard
- [ ] Latest files were downloaded
- [ ] Student Library opened successfully
