interface User {
  id: string
  email: string
  password: string
  firstName: string
  lastName: string
}

interface Retour {
  id: string
  userId: string
  orderNumber: string
  productName: string
  reason: string
  status: string
  createdAt: string
  customerNumber: string
  customerName: string
  packageCondition: string
  productCondition: string
  contactEmail: string
  contactPhone: string
  additionalInfo?: string
  processorName?: string
}

class InMemoryDB {
  private users: User[] = []
  private retouren: Retour[] = []

  findUserByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email)
  }

  createUser(user: Omit<User, "id">): User {
    const newUser = { ...user, id: Date.now().toString() }
    this.users.push(newUser)
    return newUser
  }

  updateUser(id: string, userData: Partial<User>): User | null {
    const userIndex = this.users.findIndex((user) => user.id === id)
    if (userIndex === -1) return null
    this.users[userIndex] = { ...this.users[userIndex], ...userData }
    return this.users[userIndex]
  }

  createRetour(retour: Omit<Retour, "id" | "createdAt">): Retour {
    const newRetour = {
      ...retour,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    this.retouren.push(newRetour)
    return newRetour
  }

  getRetourenByUserId(userId: string): Retour[] {
    return this.retouren.filter((retour) => retour.userId === userId)
  }

  getAllRetouren(): Retour[] {
    return this.retouren
  }

  getRetourById(id: string): Retour | undefined {
    return this.retouren.find((retour) => retour.id === id)
  }

  updateRetour(id: string, retourData: Partial<Retour>): Retour | null {
    const retourIndex = this.retouren.findIndex((retour) => retour.id === id)
    if (retourIndex === -1) return null
    this.retouren[retourIndex] = { ...this.retouren[retourIndex], ...retourData }
    return this.retouren[retourIndex]
  }
}

// Erstellen Sie eine Singleton-Instanz der Datenbank
const db = new InMemoryDB()

export default db
