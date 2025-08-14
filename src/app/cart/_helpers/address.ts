interface Address {
  recipientName: string
  street: string
  number: string
  complement?: string | null
  neighborhood: string
  city: string
  state: string
  zipCode: string
}

export function formatAddress(address: Address): string {
  const parts = [
    address.recipientName,
    `${address.street}, ${address.number}`,
    address.complement,
    address.neighborhood,
    `${address.city} - ${address.state}`,
    `CEP: ${address.zipCode}`,
  ]

  return parts.filter(Boolean).join(', ')
}
