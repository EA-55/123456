import type React from "react"

interface SchemaJsonLdProps {
  data: Record<string, any>
}

export const SchemaJsonLd: React.FC<SchemaJsonLdProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  )
}
