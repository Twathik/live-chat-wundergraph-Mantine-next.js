import React from 'react';
import { createStyles, Header, Menu, Group, Center, Burger, Container } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { ChevronDown } from 'tabler-icons-react';
import { useRouter } from 'next/router';
import { Logo } from '../Logo';
import { useWunderGraph } from '../../../../../wunderClient/hooks';

const useStyles = createStyles((theme) => ({
  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

interface HeaderSearchProps {
  links: { link: string; label: string; links?: { link: string; label: string }[] }[];
}

const AppHeader = ({ links }: HeaderSearchProps) => {
  const [opened, toggleOpened] = useBooleanToggle(false);
  const { classes } = useStyles();
  const router = useRouter();
  const {
    client: { logout },
  } = useWunderGraph();

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          delay={0}
          transitionDuration={0}
          placement="end"
          gutter={1}
          control={
            <a
              href={link.link}
              className={classes.link}
              onClick={async (event) => {
                event.preventDefault();
                if (link.link === '/logout') {
                  await logout();
                } else {
                  router.replace(link.link);
                }
              }}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <ChevronDown size={12} />
              </Center>
            </a>
          }
        >
          {menuItems}
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={async (event) => {
          event.preventDefault();
          if (link.link === '/logout') {
            await logout();
          } else {
            router.replace(link.link);
          }
        }}
      >
        {link.label}
      </a>
    );
  });

  return (
    <Header height={56} mb={50}>
      <Container>
        <div className={classes.inner}>
          <Logo />
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>

          <Burger
            opened={opened}
            onClick={() => toggleOpened()}
            className={classes.burger}
            size="sm"
          />
        </div>
      </Container>
    </Header>
  );
};

export default AppHeader;
