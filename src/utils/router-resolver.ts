const ACTIVITY_LOGS_ROUTES: Record<string, string> = {
  users: '/master/users',
  roles: '/master/roles',
  examples: '/master/examples',
};

export const getEntityLink = (log: { entity_type: string | undefined, entity_id: string | undefined }) => {
  if (log.entity_type === undefined || log.entity_id === undefined) {
    return '';
  }

  const basePath = ACTIVITY_LOGS_ROUTES[log.entity_type!];
  return basePath ? `${basePath}/${log.entity_id}` : '';
};