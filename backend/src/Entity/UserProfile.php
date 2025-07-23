<?php

namespace App\Entity;

use App\Repository\UserProfileRepository;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\User; // Assure-toi d'importer l'entité User
use Doctrine\ORM\Mapping\MapsId; // <-- AJOUTE CETTE LIGNE !

#[ORM\Entity(repositoryClass: UserProfileRepository::class)]
#[ORM\Table(name: 'user_profiles')]
class UserProfile
{
    private ?string $id = null;

    #[ORM\Id]
    #[ORM\OneToOne(targetEntity: User::class, inversedBy: 'userProfile', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(name: 'user_id', referencedColumnName: 'id', nullable: false, unique: true)]
    #[MapsId] // L'annotation MapsId
    private ?User $owner = null;

    #[ORM\Column(length: 100, nullable: true)]
    private ?string $first_name = null;

    #[ORM\Column(length: 100, nullable: true)]
    private ?string $last_name = null;

    #[ORM\Column(length: 20, nullable: true)]
    private ?string $phone_number = null;

    #[ORM\Column(type: 'text', nullable: true)]
    private ?string $address = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $company_name = null;

    #[ORM\Column]
    private ?int $credits = null;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    private ?\DateTimeImmutable $trial_end_date = null;

    #[ORM\Column]
    private ?bool $is_trial_used = null;

    #[ORM\Column(length: 50)]
    private ?string $status = null;

    #[ORM\Column(type: 'datetime_immutable')]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\Column(type: 'datetime_immutable')]
    private ?\DateTimeImmutable $updated_at = null;

    public function __construct(User $user)
    {
        $this->owner = $user;
        $this->id = $user->getId(); // Pré-remplir l'ID interne pour la cohérence

        $this->credits = 400;
        $this->is_trial_used = false;
        $this->status = 'active';
        $this->created_at = new \DateTimeImmutable();
        $this->updated_at = new \DateTimeImmutable();
    }

    public function getId(): ?string
    {
        return $this->id ?? $this->owner?->getId();
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): static
    {
        $this->owner = $owner;
        if ($owner !== null) {
            $this->id = $owner->getId();
        } else {
            $this->id = null;
        }
        return $this;
    }

    // Getters et Setters pour les autres propriétés (inchangés)
    public function getFirstName(): ?string { return $this->first_name; }
    public function setFirstName(?string $first_name): static { $this->first_name = $first_name; return $this; }
    public function getLastName(): ?string { return $this->last_name; }
    public function setLastName(?string $last_name): static { $this->last_name = $last_name; return $this; }
    public function getPhoneNumber(): ?string { return $this->phone_number; }
    public function setPhoneNumber(?string $phone_number): static { $this->phone_number = $phone_number; return $this; }
    public function getAddress(): ?string { return $this->address; }
    public function setAddress(?string $address): static { $this->address = $address; return $this; }
    public function getCompanyName(): ?string { return $this->company_name; }
    public function setCompanyName(?string $company_name): static { $this->company_name = $company_name; return $this; }
    public function getCredits(): ?int { return $this->credits; }
    public function setCredits(int $credits): static { $this->credits = $credits; return $this; }
    public function getTrialEndDate(): ?\DateTimeImmutable { return $this->trial_end_date; }
    public function setTrialEndDate(?\DateTimeImmutable $trial_end_date): static { $this->trial_end_date = $trial_end_date; return $this; }
    public function isTrialUsed(): ?bool { return $this->is_trial_used; }
    public function setTrialUsed(bool $is_trial_used): static { $this->is_trial_used = $is_trial_used; return $this; }
    public function getStatus(): ?string { return $this->status; }
    public function setStatus(string $status): static { $this->status = $status; return $this; }
    public function getCreatedAt(): ?\DateTimeImmutable { return $this->created_at; }
    public function setCreatedAt(\DateTimeImmutable $created_at): static { $this->created_at = $created_at; return $this; }
    public function getUpdatedAt(): ?\DateTimeImmutable { return $this->updated_at; }
    public function setUpdatedAt(\DateTimeImmutable $updated_at): static { $this->updated_at = $updated_at; return $this; }
}