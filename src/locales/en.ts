const translation = {
  landing: {
    title: "Dashboard - Open Source Productivity App",
  },
  profiles: {
    select: {
      title: "Choose a profile",
      description:
        "Profiles allow you to isolate configuration, identity, and activity into clearly separated vaults.",
      actions: {
        create: "Create new profile",
        import: "Import existing profile",
        docs: "Learn how profiles work",
      },

      footer: {
        hint: "You can create multiple profiles and switch between them at any time.",
      },
    },
  },
  features: {
    profiles: {
      components: {
        createDrawer: {
          title: "Create New Profile",
          actions: {
            create: "Create Profile",
          },
          fields: {
            name: {
              label: "Profile Name",
              placeholder: "Enter profile name",
            },
            description: {
              label: "Profile Description",
              placeholder: "Enter profile description (optional)",
            },
          },
        },
        listTable: {
          fields: {
            name: "Name",
            description: "Description",
          },
          actions: {
            select: "Select Profile",
          },
        },
      },
    },
  },
};
export default translation;
