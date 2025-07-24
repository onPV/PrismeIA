<?php

namespace App\Entity;

use App\Repository\IaCategoryRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\IdGenerator\UuidGenerator; // Import pour UuidGenerator
use Gedmo\Mapping\Annotation as Gedmo; // Import pour Gedmo (Timestampable)

#[ORM\Entity(repositoryClass: IaCategoryRepository::class)]
#[ORM\Table(name: 'ia_categories')] // S'assurer que le nom de la table est correct
class IaCategory
{
    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)] // Type 'uuid'
    #[ORM\GeneratedValue(strategy: 'CUSTOM')] // Stratégie CUSTOM pour UuidGenerator
    #[ORM\CustomIdGenerator(class: UuidGenerator::class)] // Utilisation de UuidGenerator
    private ?string $id = null; // L'ID est maintenant une string (UUID)

    #[ORM\Column(length: 100, unique: true)] // 'unique: true' pour le champ 'name'
    private ?string $name = null;

    #[ORM\Column(type: 'text', nullable: true)] // Le type Types::TEXT n'est pas nécessaire ici, 'text' suffit
    private ?string $description = null;

    #[ORM\Column(options: ['default' => true])] // 'options' pour définir la valeur par défaut
    private ?bool $isActive = true; // Valeur par défaut à true pour la propriété

    #[Gedmo\Timestampable(on: 'create')] // Annotation pour la date de création
    #[ORM\Column(type: 'datetime_immutable', options: ['default' => 'CURRENT_TIMESTAMP'])] // Type datetime_immutable
    private ?\DateTimeImmutable $createdAt = null;

    #[Gedmo\Timestampable(on: 'update')] // Annotation pour la date de dernière mise à jour
    #[ORM\Column(type: 'datetime_immutable', options: ['default' => 'CURRENT_TIMESTAMP'])] // Type datetime_immutable
    private ?\DateTimeImmutable $updatedAt = null;


    public function getId(): ?string // L'ID est une string (UUID)
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function isIsActive(): ?bool // Le getter pour isActive
    {
        return $this->isActive;
    }

    public function setIsActive(bool $isActive): static // Le setter pour isActive
    {
        $this->isActive = $isActive;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }
}
